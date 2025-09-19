/**
 * Prism.js
 * Lightweight syntax highlighting library
 * 
 * This is a simplified version of Prism.js for the portfolio template
 * In a real application, you would use the full version from https://prismjs.com/
 */

// Self-invoking function to avoid polluting the global namespace
(function(){
    // Create Prism object if it doesn't exist
    window.Prism = window.Prism || {};
    
    // Initialize Prism when the DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        Prism.highlightAll();
    });
    
    // Main highlight function
    Prism.highlightAll = function() {
        // Get all code blocks
        const codeBlocks = document.querySelectorAll('pre code');
        
        // Apply syntax highlighting to each code block
        codeBlocks.forEach(function(codeBlock) {
            // Add prism class to parent pre element
            const preElement = codeBlock.parentElement;
            if (preElement && preElement.tagName === 'PRE') {
                preElement.classList.add('prism');
            }
            
            // Get language class
            const languageClass = Array.from(codeBlock.classList)
                .find(className => className.startsWith('language-'));
            
            // Apply highlighting based on language
            if (languageClass) {
                const language = languageClass.replace('language-', '');
                highlightElement(codeBlock, language);
            }
        });
    };
    
    // Function to highlight a single element
    function highlightElement(element, language) {
        // Get the code text
        let code = element.textContent.trim();
        
        // Apply language-specific syntax highlighting
        let highlightedCode = '';
        
        switch (language) {
            case 'html':
                highlightedCode = highlightHTML(code);
                break;
            case 'css':
                highlightedCode = highlightCSS(code);
                break;
            case 'javascript':
            case 'js':
                highlightedCode = highlightJS(code);
                break;
            default:
                // If language is not supported, just return the code as is
                highlightedCode = escapeHTML(code);
        }
        
        // Set the highlighted code
        element.innerHTML = highlightedCode;
    }
    
    // HTML syntax highlighting
    function highlightHTML(code) {
        // Replace HTML tags
        return code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/&lt;(\/?)(\w+)(\s.*?)?&gt;/g, function(match, slash, tagName, attrs) {
                // Tag name
                let result = '&lt;<span class="token punctuation">' + slash + '</span>' +
                             '<span class="token tag">' + tagName + '</span>';
                
                // Attributes
                if (attrs) {
                    result += attrs.replace(/(\w+)="([^"]*)"/g, 
                        '<span class="token attr-name">$1</span>' +
                        '<span class="token punctuation">=</span>' +
                        '<span class="token attr-value">"$2"</span>');
                }
                
                result += '&gt;';
                return result;
            })
            .replace(/&lt;!--([\s\S]*?)--&gt;/g, '<span class="token comment">&lt;!--$1--&gt;</span>');
    }
    
    // CSS syntax highlighting
    function highlightCSS(code) {
        return code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/([\w-]+)(?=\s*\{)/g, '<span class="token selector">$1</span>')
            .replace(/(\{|\}|\;)/g, '<span class="token punctuation">$1</span>')
            .replace(/([\w-]+)(?=\s*:)/g, '<span class="token property">$1</span>')
            .replace(/(\:)/g, '<span class="token punctuation">$1</span>')
            .replace(/(#[a-fA-F0-9]{3,6})/g, '<span class="token color">$1</span>')
            .replace(/\/\*([\s\S]*?)\*\//g, '<span class="token comment">/*$1*/</span>');
    }
    
    // JavaScript syntax highlighting
    function highlightJS(code) {
        return code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/(\/\/.*)/g, '<span class="token comment">$1</span>')
            .replace(/\/\*([\s\S]*?)\*\//g, '<span class="token comment">/*$1*/</span>')
            .replace(/(["'])(.*?)\1/g, '<span class="token string">$1$2$1</span>')
            .replace(/\b(function|return|var|let|const|if|else|for|while|do|switch|case|break|continue|new|try|catch|finally|throw|class|import|export|from|default)\b/g, 
                     '<span class="token keyword">$1</span>')
            .replace(/\b(true|false|null|undefined|NaN|Infinity)\b/g, 
                     '<span class="token boolean">$1</span>')
            .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="token number">$1</span>')
            .replace(/(\(|\)|\{|\}|\[|\]|;|,|\.)/g, '<span class="token punctuation">$1</span>');
    }
    
    // Helper function to escape HTML
    function escapeHTML(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
    
})();