/**
 * "Ask Adarsh AI" Intelligent Recruiter Assistant
 * Embedded Client-Side Knowledge Base & Conversational Engine
 */

(function initAIAssistant() {
    const fabBtn = document.getElementById('aiFabBtn');
    const heroChatBtn = document.getElementById('heroChatAiBtn');
    const drawer = document.getElementById('aiDrawer');
    const closeBtn = document.getElementById('aiDrawerCloseBtn');
    const form = document.getElementById('aiInputForm');
    const input = document.getElementById('aiInputField');
    const messagesBox = document.getElementById('aiMessagesBox');
    const chipsContainer = document.getElementById('aiChipsContainer');

    if (!fabBtn || !drawer) return;

    // Toggle Drawer
    function openDrawer() {
        drawer.classList.add('open');
        input.focus();
    }
    function closeDrawer() {
        drawer.classList.remove('open');
    }

    fabBtn.addEventListener('click', () => {
        if (drawer.classList.contains('open')) closeDrawer();
        else openDrawer();
    });

    if (heroChatBtn) {
        heroChatBtn.addEventListener('click', openDrawer);
    }

    closeBtn.addEventListener('click', closeDrawer);

    // Knowledge Base Data
    const knowledgeBase = [
        {
            keywords: ['project', 'work', 'built', 'repo', 'github', 'portfolio'],
            response: `Adarsh has published <strong>10 production-ready projects</strong> on GitHub, including:<br><br>
1. <strong>RankBid Marketplace</strong>: Next.js 14 verified bidding platform with Stripe.<br>
2. <strong>Nova-AI Smart Router</strong>: Multi-LLM routing with Hindi/English voice AI.<br>
3. <strong>Productivity-Hub</strong>: Next.js 16 + React 19 task suite with Supabase.<br>
4. <strong>Saathi-Workspace</strong>: Autonomous multi-agent council OS.<br>
5. <strong>Smart College Management System</strong>: Full-stack Flask & SQLite portal.<br><br>
You can view all source codes directly on his <a href="https://github.com/adarsh12-RlL" target="_blank" style="color:#00f5d4; font-weight:700;">GitHub Profile</a>!`
        },
        {
            keywords: ['rankbid', 'bidding', 'marketplace', 'seo'],
            response: `<strong>RankBid</strong> is Adarsh's flagship Next.js 14 marketplace platform. It allows businesses to bid for top SEO rank placements with real-time verified ledger transactions. It features <strong>Stripe & Razorpay payment gateways</strong>, a simulation sandbox, <strong>RankLens live analytics</strong>, and an autonomous AI supervisor. Check the repo: <a href="https://github.com/adarsh12-RlL/RankBid-Marketplace" target="_blank" style="color:#00f5d4;">RankBid on GitHub</a>.`
        },
        {
            keywords: ['nova', 'router', 'voice', 'antivirus', 'shield'],
            response: `<strong>Nova-AI Smart Router</strong> is a Python desktop AI assistant that routes queries dynamically across Gemini, OpenAI, Claude, and local models. It features <strong>bilingual Hindi/English voice recognition</strong>, a built-in system security shield, and automatic diagnostics. Check the repo: <a href="https://github.com/adarsh12-RlL/Nova-AI-Smart-Router" target="_blank" style="color:#00f5d4;">Nova-AI on GitHub</a>.`
        },
        {
            keywords: ['saathi', 'agent', 'council', 'vault'],
            response: `<strong>Saathi-Workspace</strong> is an autonomous multi-agent operating workspace. It introduces an <em>Agent Council</em> deliberative architecture (planner, executor, reviewer), a client-side encrypted <strong>Private Memory Vault</strong> for zero-knowledge data privacy, and an interactive mini-app studio. Check the repo: <a href="https://github.com/adarsh12-RlL/Saathi-Workspace" target="_blank" style="color:#00f5d4;">Saathi-Workspace on GitHub</a>.`
        },
        {
            keywords: ['mca', 'bca', 'education', 'degree', 'college', 'university', 'cgpa', 'study', 'graduate'],
            response: `Adarsh holds a <strong>Master of Computer Applications (MCA)</strong> from <strong>Parul University</strong> (Completed 2026, <strong>7.2 CGPA</strong>).<br><br>Prior to that, he completed his <strong>Bachelor of Computer Applications (BCA)</strong> from <strong>Barkatullah University, Bhopal</strong> (Completed 2024, <strong>7.1 CGPA</strong>). He has a deep computer science foundation in DSA, Web Architecture, and Distributed Systems.`
        },
        {
            keywords: ['certif', 'iit', 'swayam', 'nptel', 'training', 'course'],
            response: `Adarsh holds 4 recognized national credentials:<br>
• <strong>IIT Bombay</strong>: Java Training Certificate (Spoken Tutorial)<br>
• <strong>SWAYAM / Aligarh Muslim University</strong>: Data Science Using Python<br>
• <strong>NPTEL</strong>: Computer Networks & Internet Protocols<br>
• <strong>Parul University</strong>: Web Application Development Using Flask (30 Hours)`
        },
        {
            keywords: ['skill', 'stack', 'tech', 'python', 'javascript', 'react', 'next', 'java'],
            response: `Adarsh's core technical stack includes:<br>
• <strong>Languages</strong>: Python 3, JavaScript (ES6+), TypeScript, Java, HTML5, CSS3, SQL<br>
• <strong>Frameworks</strong>: Next.js 14/16, React 19, Python Flask, Node.js & Express, Tailwind CSS<br>
• <strong>AI & Systems</strong>: Multi-LLM Smart Routing, Agent Councils, SpeechRecognition, Three.js 3D WebGL<br>
• <strong>Data & Cloud</strong>: SQLite, Supabase, Cloudflare Tunnels, Git/GitHub, Stripe API`
        },
        {
            keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'call', 'location', 'bhopal', 'message'],
            response: `You can reach Adarsh directly through any of these channels:<br>
• <strong>Email</strong>: <a href="mailto:adarshgokh.12@gmail.com" style="color:#00f5d4;">adarshgokh.12@gmail.com</a><br>
• <strong>Phone / WhatsApp</strong>: <a href="tel:+916232666763" style="color:#00f5d4;">+91 6232666763</a><br>
• <strong>LinkedIn</strong>: <a href="https://www.linkedin.com/in/adarsh-gokhe-59a4a928a/" target="_blank" style="color:#00f5d4;">linkedin.com/in/adarsh-gokhe-59a4a928a</a><br>
• <strong>Location</strong>: Bhopal, Madhya Pradesh, India`
        }
    ];

    function appendMessage(sender, htmlText) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `ai-message ${sender}`;
        msgDiv.innerHTML = `<div class="msg-bubble">${htmlText}</div>`;
        messagesBox.appendChild(msgDiv);
        messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function generateResponse(userQuery) {
        const query = userQuery.toLowerCase();

        for (const item of knowledgeBase) {
            for (const key of item.keywords) {
                if (query.includes(key)) {
                    return item.response;
                }
            }
        }

        return `That's a great question! Adarsh specializes in <strong>Full-Stack Development</strong> (Next.js, Python, Flask) and <strong>Autonomous AI Systems</strong>. He holds an <strong>MCA (7.2 CGPA)</strong> and has built 10 verified production repositories on GitHub. Feel free to ask about his <em>projects</em>, <em>MCA education</em>, <em>skills</em>, or email him directly at <a href="mailto:adarshgokh.12@gmail.com" style="color:#00f5d4;">adarshgokh.12@gmail.com</a>!`;
    }

    function handleUserInput(text) {
        const query = text.trim();
        if (!query) return;

        appendMessage('user', query);
        input.value = '';

        // Typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'ai-message bot typing';
        typingIndicator.innerHTML = '<div class="msg-bubble"><i class="fas fa-circle-notch fa-spin"></i> Thinking...</div>';
        messagesBox.appendChild(typingIndicator);
        messagesBox.scrollTop = messagesBox.scrollHeight;

        setTimeout(() => {
            typingIndicator.remove();
            const botReply = generateResponse(query);
            appendMessage('bot', botReply);
        }, 450);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleUserInput(input.value);
    });

    // Chip quick handlers
    if (chipsContainer) {
        chipsContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.ai-chip');
            if (chip) {
                const prompt = chip.getAttribute('data-prompt');
                handleUserInput(prompt);
            }
        });
    }
})();
