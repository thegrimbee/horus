const dangerButton = document.getElementById('dangerButton');
const warningButton = document.getElementById('warningButton');
const normalButton = document.getElementById('normalButton');
const summarizedButton = document.getElementById('summarizedButton');
const resultParagraph = document.getElementById('resultParagraph');
const termsOfServiceGlossary = {
    "acceptance": "The act of agreeing to the terms and conditions of the service. Typically, users must accept the terms to use the service.",
    "affiliate": "An entity that is related to or controlled by the service provider, often included in terms of data sharing and responsibility.",
    "arbitration": "A method of dispute resolution where an independent third party reviews the case and imposes a decision that is legally binding.",
    "assignment": "The transfer of rights or obligations under the terms of service from one party to another.",
    "attorney": "A person appointed to act for another in business or legal matters, also known as a lawyer.",
    "breach": "Violation of any term or condition set forth in the terms of service.",
    "class action waiver": "A clause that prevents users from bringing a class action lawsuit against the service provider.",
    "confidentiality": "A clause requiring parties to keep certain information secret and not disclose it to others.",
    "consent": "Agreement by the user to the terms and conditions, often required for data collection and use.",
    "consideration": "Something of value exchanged between parties as part of a contract.",
    "cookies": "Small pieces of data stored on the user's device by the web browser while using the service, often used for tracking and personalization purposes.",
    "copyright": "A legal right that grants the creator of original work exclusive rights to its use and distribution, typically for a limited time, with the intention of enabling the creator to receive compensation for their intellectual investment.",
    "data": "Information collected about the user and their use of the service.",
    "damages": "Monetary compensation awarded by a court to a person who has suffered loss or injury.",
    "defendant": "An individual, company, or institution sued or accused in a court of law.",
    "disclaimer": "A statement that denies responsibility for certain outcomes, typically used to limit legal liability.",
    "dispute resolution": "Procedures for resolving disagreements between the parties, often including arbitration or mediation.",
    "documentation": "Materials provided by the service provider to help users understand and use the service.",
    "entire agreement": "A clause stating that the terms of service represent the complete and final agreement between the parties, superseding all prior agreements.",
    "equity": "The body of law that provides remedies and justice based on fairness, as opposed to the strict rules of common law.",
    "export restrictions": "Laws and regulations that govern the export of the service to other countries.",
    "force majeure": "A clause that frees both parties from liability or obligation when an extraordinary event or circumstance beyond their control occurs.",
    "governing law": "The legal jurisdiction whose laws will be applied in interpreting and enforcing the terms of service.",
    "governing language": "The official language in which the terms of service are written and interpreted.",
    "indemnification": "A clause requiring one party to compensate the other for certain costs and damages, often related to breaches of the terms.",
    "intellectual property": "Legal rights to creations of the mind, such as inventions, literary and artistic works, designs, symbols, names, and images used in commerce.",
    "jurisdiction": "The authority given to a legal body to administer justice within a defined field of responsibility, such as a geographical area.",
    "license": "The authorization granted by the service provider to the user to use the service under specific conditions.",
    "liability": "Legal responsibility for one's actions or omissions. Terms of service often limit the liability of the service provider.",
    "limitation of liability": "A clause that limits the amount or type of damages a user can claim from the service provider.",
    "litigation": "The process of taking legal action or resolving disputes in court.",
    "modification": "The right of the service provider to change the terms of service, often with or without prior notice to the user.",
    "negligence": "Failure to take proper care in doing something, resulting in damage or injury to another.",
    "notice": "The process by which parties are formally informed of certain actions, changes, or breaches.",
    "opt-out": "The ability of the user to refuse certain terms or practices, often related to data collection or marketing.",
    "plaintiff": "A person who brings a case against another in a court of law.",
    "privacy policy": "A statement that discloses the ways in which the service provider collects, uses, and manages a user's data.",
    "prohibited activities": "A list of actions or behaviors that are not allowed while using the service.",
    "retention": "The policy regarding how long user data will be kept by the service provider.",
    "severability": "A clause stating that if part of the terms of service is found to be unenforceable, the rest of the terms will still apply.",
    "service level agreement (sla)": "A commitment between a service provider and a user defining the level of service expected.",
    "settlement": "An agreement reached between parties in a dispute, often without going to trial.",
    "subpoena": "A legal document ordering someone to attend a court proceeding and provide evidence.",
    "survival": "A clause that specifies which terms remain in effect after the termination or expiration of the agreement.",
    "termination": "The ending of the user's access to the service, often due to a breach of the terms or other specified reasons.",
    "third party": "Any individual or organization that is not the user or the service provider, but may be involved in the service or data handling.",
    "tort": "A civil wrong that causes harm or loss to another person, resulting in legal liability for the person who commits the tortious act.",
    "user content": "Any content created, uploaded, or posted by the user while using the service.",
    "usage data": "Data collected about how the user interacts with the service.",
    "waiver": "The voluntary relinquishment of a known right, often stated in the terms of service to limit future legal claims.",
    "warranty": "A guarantee provided by the service provider regarding the condition or functionality of the service.",
    "warranties": "Guarantees provided by the service provider regarding the condition or functionality of the service."
};
var summarized = false;

function normalizeKey(key) {
    key = key.toLowerCase().replace(/[.,!?;:]+$/, ''); // Remove trailing punctuation
    if (key in termsOfServiceGlossary) {
      return key;
    } else if (key.endsWith('s') && key.slice(0, -1) in termsOfServiceGlossary) {
      return key.slice(0, -1);
    } else {
      return null;
    }
  }
  
function getDefinition(term) {
    const normalizedTerm = normalizeKey(term);
    if (normalizedTerm) {
        return '<dfn><abbr class="initialism text-info" content="' + termsOfServiceGlossary[normalizedTerm] + '">' + term + '</abbr><dfn>';
    } else {
        return term;
    }
}

async function updateResult(type) {
    resultParagraph.style.display = 'block';
    var content = window.scanResult[type];
    var words = content.split(' ');
    var updatedContent = words.map(function(word) {
        return getDefinition(word);
    }).join(' ');

    resultParagraph.innerHTML = updatedContent;
}

dangerButton.addEventListener("click", function(event) {
    if (summarized) {
        updateResult('danger_summarized');
    } 
    else {
        updateResult('danger');
    }    
    dangerButton.classList.add('active');
    warningButton.classList.remove('active');
    normalButton.classList.remove('active');
    }
);
warningButton.addEventListener("click", function(event) {
    if (summarized) {
        updateResult('warning_summarized');
    } 
    else {
        updateResult('warning');
    } 
    dangerButton.classList.remove('active');
    warningButton.classList.add('active');
    normalButton.classList.remove('active');
    }
);
normalButton.addEventListener("click", function(event) {
    if (summarized) {
        updateResult('normal_summarized');
    } 
    else {
        updateResult('normal');
    } 
    dangerButton.classList.remove('active');
    warningButton.classList.remove('active');
    normalButton.classList.add('active');
    }
);

summarizedButton.addEventListener("click", function(event) {
    summarized = !summarized;
    if (summarized) {
        summarizedButton.classList.add('active');
        if (dangerButton.classList.contains('active')) {
            updateResult('danger_summarized');
        }
        else if (warningButton.classList.contains('active')) {
            updateResult('warning_summarized');
        }
        else if (normalButton.classList.contains('active')) {
            updateResult('normal_summarized');
        }
        else {
            resultParagraph.style.display = 'none';
        }
    } 
    else {
        summarizedButton.classList.remove('active');
        if (dangerButton.classList.contains('active')) {
            updateResult('danger');
        }
        else if (warningButton.classList.contains('active')) {
            updateResult('warning');
        }
        else if (normalButton.classList.contains('active')) {
            updateResult('normal');
        }
        else {
            resultParagraph.style.display = 'none';
        }
    }

})

