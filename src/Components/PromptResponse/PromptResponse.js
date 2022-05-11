import axios from "axios"
import { useState } from "react";

export default function PromptResponse() {

    const [prompt, setPrompt] = useState("")

    handleSubmit = (e) => {

        const inputData = {
            prompt: e.target.promptInput.value,
            temperature: 0.5,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        };

        e.preventDefault();
            if(!e.target.promptInput.value) {
                alert ("Please provide a prompt");
            } else {
                axios
                    .post("https://api.openai.com/v1/engines/text-curie-001/completions", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer $(process.env.API_SECRET)`,
                        },
                        body: JSON.stringify(inputData) ,
                    })

                    .then((response) => {
                        console.log(response.data)
                        const responseHistory = [
                            {
                                id: response.data.id, 
                                createdAt: response.data.created,
                                userPrompt: prompt,
                                aiResponse: response.data.choices[0]
                            },
                        ]
                        return responseHistory
                    })
            }
    }


    return (
        <main className = "promptResponse">
            <section className = "prompt">
                <form className = "prompt__form">
                    <textarea id = "promptInput" name = "promptInput" className = "prompt__input" placeholder = "provide the write-bot with a prompt!" value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
                </form>
            </section>
            <section classname = "responses">
                {responseHistory.map((response) => (
                    <div className = "responseBox">
                        <div className = "responseBox__prompt">
                            <h3 className = "reponseBox__title">Prompt:</h3>
                            <p className = "responseBox__text">{response.userPrompt}</p>
                        </div>
                        <div className = "responseBox__response">
                            <h3 className = "reponseBox__title">Response:</h3>
                            <p className = "responseBox__text">{response.aiResponse}</p>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    )
}