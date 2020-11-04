// puppeteer
const puppeteer = require('puppeteer');
// fs
const fs = require('fs');
// moment
const moment = require('moment');
// child_process
const cp = require('child_process');
// csv
const csv = require('csv');

var dayofweek = moment().format("ddd");
var nowh = moment().format("H");
var nowm = moment().format("mm");
var nowtime = Number(nowh)*60+Number(nowm);
var launchURL;

readCSV();

function readCSV()
{
    fs.createReadStream('timetable.csv').pipe(csv.parse(function(err, data)
    {
        var i;
        for(i=1;i<data.length;i++)
        {
            if(data[i][0]==dayofweek)
            {
                switch (data[i][1])
                {
                    case "0":
                        data[i][1]=Number("4")*60+Number("39");
                        break;
                    case "1":
                        // 8:50 の5分前を数値に
                        data[i][1]=Number("8")*60+Number("45");
                        break;
                    case "2":
                        data[i][1]=Number("10")*60+Number("25");
                        break;
                    case "3":
                        data[i][1]=Number("12")*60+Number("55");
                        break;
                    case "4":
                        data[i][1]=Number("14")*60+Number("35");
                        break;
                    case "5":
                        data[i][1]=Number("16")*60+Number("15");
                        break;
                    default:
                        console.log("error");
                        break;
                }
                console.log(data[i][1]-nowtime);
                launchURL=data[i][2];
                setTimeout(launch, (data[i][1]-nowtime)*60*1000);
            }
        }
    }));
}

function launch()
{
    (async () => {
        // puppeteer起動
        const browser = await puppeteer.launch({headless: false,slowMo: 100});
        var page = await browser.newPage();
        // window_size指定
        //await page.setViewport({width: 1400,height: 900});

        // zoom起動
        await page.goto(launchURL);

        // ネットワーク環境に依存
        await page.waitFor(10000);

        // ダウンロードファイル
        const filepath = fs.readFileSync("filepath.txt", "utf-8");
        var filenumber=-1;
        var recent=100000000;
        // filepathのファイルを全て探す
        const list = fs.readdirSync(filepath);

        // 最も最近インストールしたファイルを探す
        for(var i=0;i<list.length;i++)
        {
            // ファイルの時間情報を取得
            var stats = fs.statSync(filepath+"/"+list[i]);
            var filetime = stats.atimeMs;
            // 現在時刻を取得
            var now = moment().format("x");

            // 現在時刻とファイル取得時間を比較
            if(recent>Math.abs(now-filetime))
            {
                recent=Math.abs(now-filetime);
                filenumber=i;
            }
        }

        // 実行ファイルへの絶対パス
        var cmd = filepath+"/"+list[filenumber];

        child = require('child_process').exec(cmd, (err, stdout, stderr) => {
            console.log('err:', err);
            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
        })
        await browser.close();
    })();
}
