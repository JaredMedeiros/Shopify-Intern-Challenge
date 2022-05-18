import { useState } from "react";
import './PromptResponse.scss'

export default function PromptResponse() {

    const [prompt, setPrompt] = useState("")
    const [responseHistory, setResponseHistory] = useState([])
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        setPrompt(e.target.value);
    }

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
            setLoading(true)
            fetch("https://api.openai.com/v1/engines/text-curie-001/completions",{
                method: "POST",
                body: JSON.stringify(inputData), 
                headers: headers})
                
                .then(async function(response) {
                return response.json()
                .then(function(data) {
                    setLoading(false)
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

        setPrompt("")
        
    }

    return (
        <main className = "promptResponse">
            <h1 className = "pageTitle">Response Bot</h1>
            <section className = "prompt">
                <form className = "prompt__form" onSubmit = {handleSubmit}>
                    <textarea id = "promptInput" name = "promptInput" className = "prompt__input" placeholder = "Provide response bot with a prompt!" value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
                    <div className = "prompt__cta">
                        <select className = "prompt__select" onChange = {handleChange}>
                            <option value = "" disabled selected>Don't know what to ask?</option>
                            <option value = "Give me a dinner idea">Give me a dinner idea</option>
                            <option value = "Write a poem about the sun">Write a poem about the sun</option>
                            <option value = "Tell me a random fact">Tell me a random fact</option>
                        </select>
                        <button className = "prompt__button">SUBMIT</button>
                    </div>
                </form>
                {(loading === true)? <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : null  }
            </section>
            <section className = "responses">
                {responseHistory.map(res => { 
                    return ( 
                        <div className = "responseBox" key = {res.id}>
                            <div className = "responseBox__prompt">
                                <h2 className = "reponseBox__title">Prompt:</h2>
                                <p className = "responseBox__text">{res.userPrompt}</p>
                            </div>
                            <div className = "responseBox__response">
                                <h2 className = "reponseBox__title">Response:</h2>
                                <p className = "responseBox__text">{res.aiResponse}</p>
                            </div>
                        </div>
                )})}
            </section> 
        </main>
    )
}