import axios from "axios"
import { useEffect, useState } from "react";

export default function PromptResponse() {

    const [prompt, setPrompt] = useState("")
    const [responseHistory, setResponseHistory] = useState([])



    function handleSubmit(e) {

        const inputData = {
            "prompt": e.target.promptInput.value,
            "temperature": 0.5,
            "max_tokens": 64,
            "top_p": 1.0,
            "frequency_penalty": 0.0,
            "presence_penalty": 0.0
        };


        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
        }


        e.preventDefault();
            
            
        if(!e.target.promptInput.value) {
            alert ("Please provide a prompt");
        } else {
            fetch("https://api.openai.com/v1/engines/text-curie-001/completions",{
                method: "POST",
                body: JSON.stringify(inputData), 
                headers: headers})
                
                .then(function(response) {
                return response.json()
                .then(function(data) {
                    console.log(data)
                    setResponseHistory(
                        [ ...responseHistory,
                        {
                            id: data.id, 
                            createdAt: data.created,
                            userPrompt: inputData.prompt,
                            aiResponse: data.choices[0].text,
                        },]
                    )
                    console.log(responseHistory)
                })               
                });
        }
    }

    
    



    return (
        <main className = "promptResponse">
            <section className = "prompt">
                <form className = "prompt__form" onSubmit = {handleSubmit}>
                    <textarea id = "promptInput" name = "promptInput" className = "prompt__input" placeholder = "provide the write-bot with a prompt!" value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
                    <button className = "prompt__button">submit</button>
                </form>
            </section>
            <section className = "responses">
                {responseHistory.map(res => { 
                    return ( 
                        <div className = "responseBox" key = {res.id}>
                            <div className = "responseBox__prompt">
                                <h3 className = "reponseBox__title">Prompt:</h3>
                                <p className = "responseBox__text">{res.userPrompt}</p>
                            </div>
                            <div className = "responseBox__response">
                                <h3 className = "reponseBox__title">Response:</h3>
                                <p className = "responseBox__text">{res.aiResponse}</p>
                            </div>
                        </div>
                )})}
            </section>
        </main>
    )
}