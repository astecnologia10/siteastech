/**
 * AS Tech — Recebedor de briefings
 * ---------------------------------
 * Grava cada briefing como uma linha na planilha e envia um e-mail para a AS Tech.
 *
 * Como instalar:
 *  1. Crie uma Planilha Google (Sheets).
 *  2. Nela: Extensões → Apps Script.
 *  3. Apague o conteúdo e cole este arquivo inteiro. Salve.
 *  4. Implantar → Nova implantação → tipo "App da Web".
 *       - Executar como: Eu
 *       - Quem pode acessar: Qualquer pessoa
 *  5. Copie a URL que termina em /exec e coloque no .env do site:
 *       VITE_BRIEFING_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
 *  6. Na primeira execução o Google pede autorização (e-mail + planilha). Aceite.
 */

var EMAIL_TO = "astecnologia.10@gmail.com";
var ABA = "Briefings";

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);

    // Anti-spam: se o honeypot veio preenchido, ignora silenciosamente.
    if (payload.honeypot) {
      return json({ ok: true });
    }

    var fields = payload.fields || [];
    var labels = fields.map(function (f) { return f.label; });
    var values = fields.map(function (f) { return f.value; });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(ABA) || ss.insertSheet(ABA);

    // Cabeçalho na primeira vez.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Data/hora"].concat(labels));
      sheet.setFrozenRows(1);
    }

    var quando = payload.submittedAt ? new Date(payload.submittedAt) : new Date();
    sheet.appendRow([quando].concat(values));

    // E-mail para a AS Tech.
    var get = function (id) {
      var found = fields.filter(function (f) { return f.id === id; })[0];
      return found ? found.value : "";
    };
    var nome = get("nome") || "Sem nome";
    var empresa = get("empresa");
    var assunto = "Novo briefing — " + nome + (empresa ? " (" + empresa + ")" : "");
    var corpo = fields
      .filter(function (f) { return f.value; })
      .map(function (f) { return f.label + ":\n" + f.value; })
      .join("\n\n");

    MailApp.sendEmail({
      to: EMAIL_TO,
      subject: assunto,
      body: "Novo briefing recebido pelo site.\n\n" + corpo,
      replyTo: get("email") || EMAIL_TO,
    });

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, service: "AS Tech briefing" });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
