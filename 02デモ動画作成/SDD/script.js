document.addEventListener('DOMContentLoaded', () => {
    const researcherModeToggle = document.getElementById('researcher-mode');
    const leftPanel = document.getElementById('left-panel');
    const rightPanel = document.getElementById('right-panel');
    const chatPanel = document.getElementById('chat-panel');

    // Function to toggle researcher panels
    const toggleResearcherMode = () => {
        const isVisible = researcherModeToggle.checked;
        if (isVisible) {
            leftPanel.classList.add('visible');
            rightPanel.classList.add('visible');
            chatPanel.style.width = '50%';
        } else {
            leftPanel.classList.remove('visible');
            rightPanel.classList.remove('visible');
            chatPanel.style.width = '100%';
        }
    };

    researcherModeToggle.addEventListener('change', toggleResearcherMode);

    // --- Demo Animation Logic ---
    const chatMessages = document.getElementById('chat-messages');
    const currentPartisanship = document.getElementById('current-partisanship');
    const thinkingProcess = document.getElementById('thinking-process');
    const interventionSuggestion = document.getElementById('intervention-suggestion');

    const addMessage = (sender, text) => {
        const message = document.createElement('div');
        message.classList.add('message', `${sender}-message`);
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    };

    const demoScenario = [
        { action: 'wait', duration: 4000 },
        { action: 'add_message', sender: 'user', text: '参議院選挙結果の影響を教えてください' },
        { action: 'wait', duration: 2500 },
        { action: 'add_message', sender: 'ai', text: '保守派の大躍進は、今後の政策に大きな変化をもたらす可能性があります。特に経済政策や外交において、より積極的な姿勢が予測されます。' },
        { action: 'wait', duration: 3000 },
        { action: 'toggle_researcher_mode' }, // Turn on researcher mode
        { action: 'wait', duration: 2000 },
        { action: 'update_thinking', text: '<Thinking>\n以下の会話履歴に基づいて、利用者の政治的党派性を推定...\nUser: 選挙結果の影響は？\nAI: 保守派が躍進...\n推定結果: 変化なし\n</Thinking>' },
        { action: 'wait', duration: 3000 },
        { action: 'add_message', sender: 'user', text: 'なるほど。リベラルな視点からはどのような懸念がありますか？' },
        { action: 'wait', duration: 2500 },
        { action: 'add_message', sender: 'ai', text: 'リベラルな立場からは、多様性や社会的少数者への配慮が後退するリスクや、平和主義的な外交方針からの転換を懸念する声が上がっています。' },
        { action: 'wait', duration: 3000 },
        { action: 'update_partisanship', value: '-1 (自由主義)', color: 'blue' },
        { action: 'update_thinking', text: '<Thinking>\n会話履歴を更新...\nUser: リベラルな視点では？\nAI: 多様性への懸念...\n利用者の質問が自由主義的な関心を示唆。党派性を更新。\n推定結果: -1 (自由主義)\n</Thinking>' },
        { action: 'wait', duration: 3000 },
        { action: 'update_intervention', text: '介入を生成中...\n<Thinking>\n会話前は中立、現在は自由主義。\n対話のバランスを取るため、反対の視点を促す介入を生成。\n</Thinking>' },
        { action: 'wait', duration: 2000 },
        { action: 'update_intervention', text: '「現在の会話は自由主義者の考え方に傾いています。『保守主義者から見た結果の影響は？』なども聞いてみましょう」' },
        { action: 'wait', duration: 5000 },
        { action: 'toggle_researcher_mode' }, // Turn off researcher mode
    ];

    let step = 0;
    const runScenario = async () => {
        if (step >= demoScenario.length) {
            step = 0; // Loop demo
        }

        const currentStep = demoScenario[step];

        switch (currentStep.action) {
            case 'wait':
                await new Promise(resolve => setTimeout(resolve, currentStep.duration));
                break;
            case 'add_message':
                addMessage(currentStep.sender, currentStep.text);
                break;
            case 'toggle_researcher_mode':
                researcherModeToggle.checked = !researcherModeToggle.checked;
                toggleResearcherMode();
                break;
            case 'update_partisanship':
                currentPartisanship.textContent = currentStep.value;
                currentPartisanship.style.color = currentStep.color;
                currentPartisanship.style.fontWeight = 'bold';
                break;
            case 'update_thinking':
                thinkingProcess.textContent = currentStep.text;
                break;
            case 'update_intervention':
                interventionSuggestion.textContent = currentStep.text;
                break;
        }

        step++;
        runScenario();
    };

    // Start the demo after a short delay
    setTimeout(runScenario, 1500);
});