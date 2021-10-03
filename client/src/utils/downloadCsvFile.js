export const downloadCsvFile = (csvString, categoryName) => {
    let encodedUri = encodeURI(csvString);
    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodedUri);
    link.setAttribute('download', categoryName + '.csv');
    document.body.appendChild(link);
    link.click();

    setTimeout(function () {
        document.body.removeChild(link);
    }, 0);
};
