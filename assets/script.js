function generateHTML() {
    const fileInput = document.getElementById("imageFile");
    const file = fileInput.files[0];
    const altText = document.getElementById("altText").value || "画像";
    const styleText = document.getElementById("styleText").value;
    const styleSwitch = document.getElementById("styleSwitch").checked;

    if (!file) {
        alert("画像ファイルを選択してください。");
        return;
    }

    // ファイルのURLを生成
    const reader = new FileReader();
    reader.onload = function (e) {
        const imageURL = e.target.result;

        // style属性を含むかどうか
        const styleAttr = styleSwitch && styleText.trim() ? ` style="${styleText}"` : "";

        // HTMLタグを生成
        const htmlTag = `<img src="${imageURL}" alt="${altText}"${styleAttr}>`;
        document.getElementById("outputHTML").value = htmlTag;

        // コピー用ボタンを活性化
        document.getElementById("copyButton").disabled = false;

        // プレビューエリアに表示
        document.getElementById("preview").innerHTML = `
            <img src="${imageURL}" alt="${altText}"${styleAttr}>
        `;
    };

    // ファイルをデータURLとして読み込む
    reader.readAsDataURL(file);
}

function copyToClipboard() {
    const outputHTML = document.getElementById("outputHTML");
    outputHTML.select();
    outputHTML.setSelectionRange(0, 99999); // モバイル対応
    document.execCommand("copy");
    alert("HTMLタグがコピーされました！");
}
