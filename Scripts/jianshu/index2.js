// 改进版
// 获取所有文集
fetch("https://www.jianshu.com/author/notebooks")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    let wenjiArr = [];
    wenjiArr = data;
    let articleLength = 0;
    wenjiArr.forEach((item, index) => {

      setTimeout(() => {
      // 根据文集获取文章
      fetch(`https://www.jianshu.com/author/notebooks/${item.id}/notes`)
        .then((res2) => res2.json())
        .then((data2) => {
          console.log("输出文集下的所有文章：", data2);

          console.log(item.name + " 文集中的文章数量: " + data2.length);
          articleLength = articleLength + data2.length;

          console.log("articleLength: ", articleLength);
          data2.forEach(async (item2, i) => {
            // 这里面使用 setTimeout 处理一下，防止一下子请求太多，下载任务太多把浏览器弄崩了
            setTimeout(() => {
              // 根据文章id获取Markdown内容
              fetch(`https://www.jianshu.com/author/notes/${item2.id}/content`)
                .then((res3) => res3.json())
                .then((data3) => {
                  console.log(data3);

                  const blob = new Blob([data3.content], {
                    type: "text/markdown",
                  });

                  const link = document.createElement("a");

                  link.href = window.URL.createObjectURL(blob);

                  link.download = item.name + " - 《" + item2.title + `》.md`;

                  link.click();
                });
            }, 2000 * (i + index));
          });
        });

      }, 1000 * index)
    });
  });

