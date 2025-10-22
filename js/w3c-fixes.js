// Correções automáticas para conformidade W3C
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar estilos CSS para animações das mensagens
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Corrigir qualquer link sem href que possa ter escapado
    document.querySelectorAll('a:not([href])').forEach(link => {
        const text = link.textContent.trim();
        if (text.includes('@')) {
            link.href = `mailto:${text}`;
        } else if (/\(\d{2}\)\s*\d{4,5}-\d{4}/.test(text)) {
            const tel = text.replace(/\D/g, '');
            link.href = `tel:+55${tel}`;
        } else {
            // Se não for email ou telefone, remover a tag <a>
            const span = document.createElement('span');
            span.textContent = text;
            link.parentNode.replaceChild(span, link);
        }
    });
});