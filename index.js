document.querySelector('#gerarDocumento').addEventListener('click', generate);

const config = {};
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

let contador = 1;

function adicionarItem() {
  contador++;
  const divItens = document.getElementById('itens');
  const novaDiv = document.createElement('div');
  novaDiv.classList.add('item');
  const novoLabel = document.createElement('label');
  novoLabel.setAttribute('for', `item-${contador}`);
  novoLabel.textContent = `Item ${contador}:`;
  const novoInput = document.createElement('input');
  novoInput.setAttribute('type', 'text');
  novoInput.setAttribute('id', `item-${contador}`);
  novoInput.setAttribute('name', 'itens[]');
  novoInput.setAttribute('required', true);
  novaDiv.appendChild(novoLabel);
  novaDiv.appendChild(novoInput);
  divItens.appendChild(novaDiv);
}

function processForm(event) {
  event.preventDefault(); // evita que o formulário seja enviado
  const itensInputs = document.getElementsByName('itens[]');
  const itens = Array.from(itensInputs).map(input => input.value);
  console.log(itens);
}

function generate() {
  loadFile('template.docx', function (error, content) {
    if (error) {
      throw error;
    }
    var zip = new PizZip(content);
    var doc = new window.docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: false,
      textAlign: 'justify'
    });

    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render(config);

    var blob = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: 'DEFLATE'
    });
    // Output the document using Data-URI

    saveAs(blob, 'output.docx');
  });
}
