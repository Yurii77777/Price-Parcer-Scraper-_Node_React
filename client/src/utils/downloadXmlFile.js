export const downloadXmlFile = (xmlString, categoryName) => {
    const xmlFile = new Blob([xmlString], { type: 'application/xml' });

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(xmlFile, categoryName);
    } else {
        let a = document.createElement('a');
        let url = URL.createObjectURL(xmlFile);
        a.href = url;
        a.download = categoryName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
};
