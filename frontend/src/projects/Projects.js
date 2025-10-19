import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./Projects.css";
import BottomNav from "../components/BottomNav";

function Projects() {
    const projects = [
        {
            title: "applyied",
            description: "co-founded ai-powered job platform using next.js, firebase, python, and openai's api. developed modular server components with tailwind css, built scalable backend systems, and implemented ai-driven resume parsing with intelligent tracking pipelines. deployed on vercel for secure, high-performance global delivery.",
            code: `from typing import Dict, List
from openai import OpenAI
from firebase_admin import firestore, auth

class ApplyiedPlatform:
    def __init__(self):
        self.client = OpenAI()
        self.db = firestore.client()
    
    def parse_resume(self, resume_text: str, job_desc: str) -> Dict:
        """
        ai-driven resume parsing and optimization pipeline
        integrates openai api for intelligent analysis
        """
        prompt = f"""
        analyze resume against job description.
        extract: skills, experience, education, match score
        job: {job_desc}
        resume: {resume_text}
        """
        
        response = self.client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        
        analysis = self.process_ai_response(response)
        self.track_application(analysis)
        
        return {
            "match_score": analysis.score,
            "suggestions": analysis.improvements,
            "optimized_resume": self.enhance_resume(resume_text, analysis)
        }
    
    def track_application(self, data: Dict) -> None:
        # firebase firestore for scalable tracking
        self.db.collection('applications').add(data)
    
    def enhance_resume(self, resume: str, analysis: Dict) -> str:
        # edge-ready optimization
        return self.apply_suggestions(resume, analysis.improvements)`
        },
        {
            title: "zero-fee blockchain payments",
            description: "researching blockchain protocols for scalable, instant, zero-fee transfers between web3 wallets and bank accounts. prototyped solidity smart contracts and off-chain settlement flows to reduce costs and latency. designed web3-to-fintech integration supporting exchanges, stablecoins, and defi payments.",
            code: `from web3 import Web3
from typing import Optional
import asyncio

class Web3PaymentBridge:
    def __init__(self, rpc_url: str):
        self.w3 = Web3(Web3.HTTPProvider(rpc_url))
        self.settlement_layer = OffChainSettlement()
    
    async def transfer_to_bank(
        self, 
        wallet_address: str, 
        amount: float,
        bank_account: str
    ) -> Dict:
        """
        zero-fee web3 to fiat bridge
        uses off-chain settlement to eliminate gas fees
        supports stablecoins (USDC, USDT) and native tokens
        """
        # check wallet balance
        balance = await self.check_web3_balance(wallet_address)
        
        if balance >= amount:
            # create settlement transaction off-chain
            tx_hash = await self.settlement_layer.initiate(
                sender=wallet_address,
                recipient=bank_account,
                amount=amount,
                token="USDC"
            )
            
            # batch settlements for cost reduction
            await self.settlement_layer.batch_process()
            
            return {
                "status": "success",
                "tx_hash": tx_hash,
                "settlement_time": "instant",
                "fees": 0.00  # zero-fee architecture
            }
        
        return {"status": "insufficient_balance"}
    
    async def check_web3_balance(self, address: str) -> float:
        # query blockchain state
        return self.w3.eth.get_balance(address) / 10**18`
        },
        {
            title: "university voice assistant",
            description: "built nlp-powered voice assistant for gonzaga.edu using python, scrapy, and modern parsing frameworks. indexed and parsed campus-wide content for accurate contextual queries. delivered real-time voice responses with speechrecognition and gtts in responsive web interface.",
            code: `import speech_recognition as sr
from gtts import gTTS
from scrapy import Spider
import nltk
from typing import List, Dict

class GonzagaVoiceAssistant:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.knowledge_base = self.index_campus_content()
        self.nlp_engine = nltk.load('en_core_web_sm')
    
    def index_campus_content(self) -> Dict:
        """
        scrapy-based campus content indexing
        parses gonzaga.edu for fast contextual retrieval
        """
        spider = GonzagaCrawler()
        indexed_data = spider.crawl_and_parse()
        
        return {
            "courses": indexed_data.courses,
            "events": indexed_data.events,
            "faculty": indexed_data.faculty,
            "facilities": indexed_data.buildings
        }
    
    def process_voice_query(self, audio_input) -> str:
        """
        real-time voice processing pipeline
        speech -> text -> nlp -> contextual search -> response
        """
        # speech recognition
        text = self.recognizer.recognize_google(audio_input)
        
        # nlp parsing for intent
        intent = self.nlp_engine(text)
        query_type = self.classify_intent(intent)
        
        # contextual search
        results = self.search_knowledge_base(query_type, text)
        
        # generate and speak response
        response = self.format_response(results)
        audio = gTTS(text=response, lang='en')
        
        return response
    
    def classify_intent(self, parsed_text) -> str:
        # accurate contextual query classification
        return self.nlp_engine.classify(parsed_text)`
        }
    ];

    return (
        <div className="projects-page">
            <main className="projects-container">
                <h1 className="projects-title">projects</h1>
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <div className="project-info">
                                <h2>{project.title}</h2>
                                <p>{project.description}</p>
                            </div>
                            <div className="ide-container">
                                <div className="ide-header">
                                    <span className="ide-dot red"></span>
                                    <span className="ide-dot yellow"></span>
                                    <span className="ide-dot green"></span>
                                </div>
                                <div className="ide-body">
                                    <SyntaxHighlighter 
                                        language="python" 
                                        style={vscDarkPlus} 
                                        className="ide-code"
                                        customStyle={{
                                            margin: 0,
                                            padding: '15px',
                                            background: '#282c34',
                                            fontSize: '12px',
                                            lineHeight: '1.5'
                                        }}
                                    >
                                        {project.code}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <BottomNav />
        </div>
    );
}

export default Projects;
