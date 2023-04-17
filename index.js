document.querySelector('button').addEventListener('click', generate);

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

function generate() {
  console.log('foi');
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
    doc.render({
      coordenador: 'LUCAS FRUTUOZO BRAGA',
      autor1: 'LUCAS FRUTUOZO BRAGA',
      autor2: 'WILLIAN MATIUSSI',
      titulo: 'TCC CONTROL',
      patrocinador: `Lucas Frutuozo Braga e Willian Matiussi`,
      gerente: 'Felipe Perez',
      objetivo: `O objetivo deste trabalho é desenvolver um sistema para
        gerenciar a disciplina de TCC, de modo que todos os envolvidos, como
        orientandos, orientadores e professor da disciplina, possam desfrutar de
        um fluxo mais organizado, proveniente do sistema que será capaz de
        controlar prazos por meio de calendários, cronogramas e alertas. Além
        disso, o sistema tornará as entregas mais organizadas, podendo ser
        facilmente visualizadas na aplicação.`,
      justificativa: `Atualmente, a Universidade Unigran realiza todo o processo
        de orientação e avaliação de TCCs de forma manual, o que pode
        ocasionar em fluxos de trabalho inadequados, gerando problemas como
        atrasos, retrabalhos e a possibilidade de não conclusão do projeto. Além
        disso, a falta de comunicação efetiva entre orientadores e alunos pode
        prejudicar a eficácia e a qualidade do trabalho. Por isso, faz-se
        necessário um software para gerenciar o TCC, de modo que o
        desenvolvimento do TCC não seja permeado por problemas como fluxo
        de trabalho desorganizado, falta de acompanhamento das atividades e
        falta de comunicação e colaboração entre os alunos e orientadores.`,
      descricao: `O projeto terá início em fevereiro de 2023, incluindo
        planejamento, desenvolvimento, testes e implantação do sistema que
        deverá estar concluído até o final de novembro de 2023. O sistema deve
        ser capaz de gerenciar todo o processo de orientação e avaliação de
        TCCs da universidade, desde o cadastro de alunos e professores
        envolvidos, registro de informações sobre o TCC, acompanhamento do
        processo de orientação, controle de prazos, cronogramas, alertas e
        entregas das atividades.`,
      riscos: `Atraso na entrega de algum módulo do sistema e o sistema ser
        entregue com bugs.`
    });

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
