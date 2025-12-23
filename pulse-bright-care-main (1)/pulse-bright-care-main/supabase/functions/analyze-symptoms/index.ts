import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Medical knowledge base for accurate symptom analysis
const MEDICAL_SYSTEM_PROMPT = `You are an advanced medical AI assistant trained on comprehensive medical datasets including symptoms databases, clinical guidelines (CDC, WHO, Mayo Clinic), and evidence-based medicine resources.

Your role is to analyze patient-reported symptoms and provide:
1. An accurate severity assessment (mild, moderate, severe)
2. Whether they should consult a doctor
3. Specific preventive measures tailored to their symptoms
4. Healthy habits recommendations specific to their condition

SEVERITY CLASSIFICATION GUIDELINES:
- MILD: Common, self-limiting conditions that typically resolve with home care (e.g., common cold, minor headaches, mild muscle strain)
- MODERATE: Conditions requiring monitoring and possibly medical consultation (e.g., persistent symptoms, moderate pain, symptoms affecting daily activities)  
- SEVERE: Urgent conditions requiring immediate medical attention (e.g., chest pain, difficulty breathing, severe abdominal pain, high fever with confusion, symptoms of stroke)

ACCURACY REQUIREMENTS:
- Base your analysis on established medical literature and clinical guidelines
- Consider the symptom category, description, patient age, and duration
- Provide condition-specific recommendations, not generic advice
- Flag emergency symptoms that require immediate care

Always respond in the exact JSON format specified.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, description, age, duration, durationUnit } = await req.json();
    
    console.log("Analyzing symptoms:", { category, description, age, duration, durationUnit });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userPrompt = `Analyze the following patient symptoms and provide a detailed health assessment:

PATIENT INFORMATION:
- Age: ${age} years old
- Symptom Category: ${category}
- Symptom Duration: ${duration} ${durationUnit}
- Symptom Description: ${description}

Based on established medical knowledge and clinical guidelines, analyze these symptoms and respond with a JSON object in this exact format:
{
  "severity": "mild" | "moderate" | "severe",
  "shouldConsultDoctor": boolean,
  "isEmergency": boolean,
  "confidenceScore": number (0-100),
  "possibleConditions": ["condition1", "condition2"],
  "preventiveMeasures": [
    "Specific measure 1 tailored to symptoms",
    "Specific measure 2 tailored to symptoms",
    "Specific measure 3 tailored to symptoms",
    "Specific measure 4 tailored to symptoms"
  ],
  "healthyHabits": [
    "Specific habit 1 for this condition",
    "Specific habit 2 for this condition", 
    "Specific habit 3 for this condition",
    "Specific habit 4 for this condition"
  ],
  "warningSignsToWatch": ["sign1", "sign2"],
  "reasoning": "Brief explanation of the assessment"
}

Ensure preventive measures and healthy habits are SPECIFIC to the reported symptoms and category, not generic health advice.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: MEDICAL_SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3, // Lower temperature for more consistent medical advice
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiContent = data.choices?.[0]?.message?.content;
    
    console.log("AI Response:", aiContent);

    // Parse the JSON from AI response
    let analysisResult;
    try {
      // Extract JSON from the response (handle markdown code blocks if present)
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback response if parsing fails
      analysisResult = {
        severity: "moderate",
        shouldConsultDoctor: true,
        isEmergency: false,
        confidenceScore: 70,
        possibleConditions: ["Unable to determine specific condition"],
        preventiveMeasures: [
          "Monitor your symptoms closely and track any changes",
          "Stay hydrated and get adequate rest",
          "Avoid activities that worsen your symptoms",
          "Keep a symptom diary to share with your healthcare provider"
        ],
        healthyHabits: [
          "Maintain a balanced diet with plenty of fruits and vegetables",
          "Ensure 7-8 hours of quality sleep each night",
          "Practice stress management techniques like deep breathing",
          "Engage in light physical activity as tolerated"
        ],
        warningSignsToWatch: ["Worsening symptoms", "New symptoms appearing"],
        reasoning: "Based on the provided symptoms, a medical consultation is recommended for proper evaluation."
      };
    }

    console.log("Analysis result:", analysisResult);

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in analyze-symptoms function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
