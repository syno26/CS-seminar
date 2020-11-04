# git pushまでの手順

gitとgithubの環境設定が大体終わっているとする．
自分はVSCodeのwslで操作した．GUIでの操作は分かりません．


## git clone
cloneで自分の環境に持ってくる．多分最初だけ．
warningでリポジトリが空というのが出るが多分気にしなくていい．

```
git clone [url]
```


## init
ローカルの保存したいディレクトリまで移動して，

```
git init
```


## remote add origin url
次のコードを実行．
originは好きなものに変更できる．[url]はレポジトリのURLでgit@github.com:ユーザー名/レポジトリ名.git

```
git remote add origin [url].git
```


## 適当なファイルを作成
hello.jsを作った．


## add
addする．.（コンマ）で全部addできる．

```
git add .
```


## commit 
オプションで-mをつけるとメッセージを追加できる．""で囲ってあるのがメッセージ

```
git commit -m "first commit"
```


## push
origin はremote add でつけたやつ．masterはブランチ名だけどとりあえず気にしない．

```
git push origin master
```

以上で終わりなはず．
