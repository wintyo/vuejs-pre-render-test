const fs = require('fs').promises;
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
async function beautifyHtml(dirName) {
  try {
    const dirents = await fs.readdir(dirName, { withFileTypes: true });

    // directoryの場合は再帰呼び出し
    dirents
      .filter((dirent) => dirent.isDirectory())
      .forEach(async (dirent) => {
        await beautifyHtml(`${dirName}/${dirent.name}`);
      });

    // htmlファイルの場合はbeautifyする
    dirents
      .filter((dirent) => /\.html$/.test(dirent.name))
      .forEach(async (dirent) => {
        const targetFilePath = `${dirName}/${dirent.name}`;

        try {
          const html = await fs.readFile(targetFilePath, 'utf8');
          const beautifiedHtml = beautify.html(html, beautifyOptions);
          await fs.writeFile(targetFilePath, beautifiedHtml, 'utf8');
        } catch (err) {
          console.error(err);
        }
      });
  } catch (err) {
    console.error(err);
  }
}

beautifyHtml(TARGET_DIR);
