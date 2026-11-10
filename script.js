/**
 * Adarsh Gokhe - Portfolio Master UI Interactions
 * Features:
 * - 3D Gyroscope Card Tilt Physics Engine
 * - Smooth Typewriter Role Rotation
 * - Project Category Filtering Tabs
 * - Animated Metric Counters with IntersectionObserver
 * - Interactive Developer Terminal CLI Emulator
 * - Email Copy Toast & Ambient Cursor Tracker
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Ambient Cursor Spotlight Follower
    // ==========================================
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // ==========================================
    // 2. 3D Gyroscope Card Tilt Physics
    // ==========================================
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // ==========================================
    // 3. Typewriter Effect
    // ==========================================
    const typewriterEl = document.getElementById('typewriterText');
    const roles = [
        "Full-Stack Web Architectures",
        "Autonomous AI Agent Systems",
        "Next.js & React 19 Platforms",
        "Python Automation Pipelines",
        "Scalable Cloud Backend APIs"
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingDelay = 80;

    function typeRole() {
        if (!typewriterEl) return;
        const currentRole = roles[roleIdx];

        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            typingDelay = 40;
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            typingDelay = 80;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            isDeleting = true;
            typingDelay = 1800; // Pause at end of text
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            typingDelay = 400; // Pause before next word
        }

        setTimeout(typeRole, typingDelay);
    }
    typeRole();

    // ==========================================
    // 4. Project Category Filtering
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach((card) => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ==========================================
    // 5. Animated Stats Number Counters
    // ==========================================
    const statCounters = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimatedStats) {
                hasAnimatedStats = true;
                statCounters.forEach((counter) => {
                    const target = parseInt(counter.getAttribute('data-target'), 10);
                    let count = 0;
                    const duration = 1200;
                    const stepTime = Math.max(Math.floor(duration / target), 30);

                    const timer = setInterval(() => {
                        count++;
                        counter.textContent = count;
                        if (count >= target) {
                            clearInterval(timer);
                            counter.textContent = target;
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.3 });

    statCounters.forEach(c => statsObserver.observe(c));

    // ==========================================
    // 6. Interactive Developer Terminal CLI Mode
    // ==========================================
    const openTerminalBtn = document.getElementById('openTerminalBtn');
    const terminalModal = document.getElementById('terminalModal');
    const terminalOverlay = document.getElementById('terminalOverlay');
    const terminalCloseBtn = document.getElementById('terminalCloseBtn');
    const terminalInput = document.getElementById('terminalInput');
    const terminalHistory = document.getElementById('terminalHistory');
    const terminalBody = document.getElementById('terminalBody');

    function openTerminal() {
        if (!terminalModal) return;
        terminalModal.classList.add('open');
        terminalInput.focus();
    }

    function closeTerminal() {
        if (!terminalModal) return;
        terminalModal.classList.remove('open');
    }

    if (openTerminalBtn) openTerminalBtn.addEventListener('click', openTerminal);
    if (terminalCloseBtn) terminalCloseBtn.addEventListener('click', closeTerminal);
    if (terminalOverlay) terminalOverlay.addEventListener('click', closeTerminal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && terminalModal && terminalModal.classList.contains('open')) {
            closeTerminal();
        }
    });

    const cliCommands = {
        help: `Available CLI Commands:
• <span class="cli-cmd">about</span>      - Who is Adarsh Gokhe?
• <span class="cli-cmd">projects</span>   - List featured production repositories
• <span class="cli-cmd">skills</span>     - Core technical stack
• <span class="cli-cmd">education</span>  - Academic degree and credentials
• <span class="cli-cmd">contact</span>    - Official contact methods
• <span class="cli-cmd">clear</span>      - Clear the console screen
• <span class="cli-cmd">exit</span>       - Close this terminal window`,
        
        about: `Adarsh Gokhe is a Full-Stack & AI Software Engineer with an MCA from Parul University (7.2 CGPA).
Based in Bhopal, India, he specializes in scalable web systems, autonomous agent councils, and payment-integrated platforms like RankBid.`,
        
        projects: `Top Repositories on GitHub (adarsh12-RlL):
1. <a href="https://github.com/adarsh12-RlL/RankBid-Marketplace" target="_blank" style="color:#00f5d4;">RankBid-Marketplace</a> (Next.js 14, Stripe, SEO Bidding)
2. <a href="https://github.com/adarsh12-RlL/Nova-AI-Smart-Router" target="_blank" style="color:#00f5d4;">Nova-AI-Smart-Router</a> (Python, Multi-LLM, Voice AI)
3. <a href="https://github.com/adarsh12-RlL/Productivity-Hub" target="_blank" style="color:#00f5d4;">Productivity-Hub</a> (Next.js 16, React 19, Supabase)
4. <a href="https://github.com/adarsh12-RlL/Saathi-Workspace" target="_blank" style="color:#00f5d4;">Saathi-Workspace</a> (Multi-Agent Council OS)
5. <a href="https://github.com/adarsh12-RlL/Smart-College-Management-System" target="_blank" style="color:#00f5d4;">College-Management</a> (Python, Flask, SQLite)`,

        skills: `Languages: Python 3, JavaScript (ES6+), TypeScript, Java, SQL, HTML/CSS
Frameworks: Next.js 14/16, React 19, Flask, Node.js/Express, Tailwind CSS
AI / Cloud: Multi-LLM Routing, Three.js 3D, SQLite, Supabase, Cloudflare Tunnels`,

        education: `• Master of Computer Applications (MCA) - Parul University (2026, 7.2 CGPA)
• Bachelor of Computer Applications (BCA) - Barkatullah University (2024, 7.1 CGPA)
• Certifications: IIT Bombay (Java), SWAYAM (Python Data Science), NPTEL (Networking)`,

        contact: `• Email: adarshgokh.12@gmail.com
• Phone: +91 6232666763
• LinkedIn: https://www.linkedin.com/in/adarsh-gokhe-59a4a928a/
• GitHub: https://github.com/adarsh12-RlL`
    };

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim().toLowerCase();
                const logEntry = document.createElement('div');
                logEntry.style.marginBottom = '0.8rem';
                
                logEntry.innerHTML = `<div><span class="terminal-prompt">adarsh@portfolio:~$</span> ${terminalInput.value}</div>`;

                if (cmd === 'clear') {
                    terminalHistory.innerHTML = '';
                    terminalInput.value = '';
                    return;
                } else if (cmd === 'exit') {
                    closeTerminal();
                    terminalInput.value = '';
                    return;
                } else if (cliCommands[cmd]) {
                    logEntry.innerHTML += `<div style="color: #cbd5e1; margin-top: 0.3rem;">${cliCommands[cmd]}</div>`;
                } else if (cmd !== '') {
                    logEntry.innerHTML += `<div style="color: #f87171; margin-top: 0.3rem;">command not found: "${cmd}". Type <span class="cli-cmd">help</span> for assistance.</div>`;
                }

                terminalHistory.appendChild(logEntry);
                terminalInput.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

    // ==========================================
    // 7. Email Copy Toast Notification
    // ==========================================
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(text) {
        if (!toast) return;
        toastMessage.textContent = text;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2800);
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email');
            navigator.clipboard.writeText(email).then(() => {
                showToast(`Copied ${email} to clipboard!`);
            }).catch(() => {
                showToast('Failed to copy. Email: adarshgokh.12@gmail.com');
            });
        });
    }

    // ==========================================
    // 8. Mobile Navigation Drawer Toggle
    // ==========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu on clicking nav link
        navMenu.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // ==========================================
    // 9. Navbar Scroll Transparency Spy
    // ==========================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(6, 8, 13, 0.92)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(6, 8, 13, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    }, { passive: true });

});
