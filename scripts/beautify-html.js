const fs = require('fs');
const beautify = require('js-beautify');

const TARGET_DIR = './dist';

// 整形オプション
// https://www.npmjs.com/package/js-beautify
const beautifyOptions = {
  indent_size: 2,
  end_with_newline: true,
  preserve_newlines: false,
  max_preserve_newlines: 0,
  wrap_line_length: 0,
  wrap_attributes_indent_size: 0,
  unformatted: ['b', 'em'],
};

/**
 * 指定ディレクトリのHTMLを整形する
 * @param dirName - ディレクトリ名
 */
function beautifyHtml(dirName) {
  fs.readdir(dirName, { withFileTypes: true }, (err, dirents) => {
    if (err) {
      console.error(err);
      return;
    }

    // directoryの場合は再帰呼び出し
    dirents
      .filter((dirent) => dirent.isDirectory())
      .forEach((dirent) => {
        beautifyHtml(`${dirName}/${dirent.name}`);
      });

    // htmlファイルの場合はbeautifyする
    dirents
      .filter((dirent) => /\.html$/.test(dirent.name))
      .forEach((dirent) => {
        const targetFilePath = `${dirName}/${dirent.name}`;
        fs.readFile(targetFilePath, 'utf8', (err, html) => {
          if (err) {
            console.error(err);
            return;
          }

          const beautifiedHtml = beautify.html(html, beautifyOptions);
          fs.writeFile(targetFilePath, beautifiedHtml, 'utf8', (err) => {
            if (err) {
              console.error(err);
              return;
            }
          });
        });
      });
  });
}

beautifyHtml(TARGET_DIR);
