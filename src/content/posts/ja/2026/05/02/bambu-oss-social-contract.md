---
title: "Bambu Labとオープンソースの社会契約 — ライセンスは守ったが精神は破った灰色地帯"
description: "AGPLを守りつつ、ユーザーをクラウドに閉じ込めるハードウェアメーカーの登場。4月のGitHub事件と同じ週に起きたこの出来事は、OSSの法的拘束力と道徳的拘束力の距離を正確に浮き彫りにした。"
pubDate: 2026-05-02T00:00:00.000Z
lang: ja
pairSlug: bambu-oss-social-contract
draft: false
---

# Bambu Labとオープンソースの社会契約 — ライセンスは守ったが精神は破った灰色地帯

> 一企業がオープンソースのコードを取り込み、自社のクローズドなクラウドの内側にユーザーを囲い込み、そのクラウドの外へ出ようとするfork開発者に法的脅迫を送る。このとき我々は何が壊れたと言うべきなのか — ライセンスなのか、それともライセンスが守ってくれない別の何かなのか。

## 導入 — 4月に続く、二度目のOSS神話の亀裂

2026年5月12日、Jeff Geerlingが自身のブログに「Bambu Lab is abusing the open source social contract」という記事を公開した。Hacker News一面の上位に即座に到達し、1,200点を超えるスコアと380件超のコメントが集まった。記事の要旨は単純である。3DプリンタメーカーのBambu Labが、OrcaSlicerというオープンソーススライサーのfork — 正確にはそのforkのforkであるOrcaSlicer-bambulab — の単独開発者にcease and desistを送り、その過程で「impersonation attack」という強い表現を用いて公式ブログでその開発者を非難した、というものだ。

この事件が一企業のPR事故で終わらない理由は、その数日前に起きた別の事件の影にある。2026年4月最終週、GitHubはガバナンス・稼働率・セキュリティ・コストの四軸で同時に亀裂を見せ、Mitchell Hashimotoは「キーボードに涙が落ちた」という記事でGitHubでの18年を整理して去った。同時期にOSSエコシステムのもう一方の端 — つまりハードウェアメーカー領域 — でも、似た筋の亀裂が報告されたわけである。

二つの事件は表面的には異なる。GitHubはホスティングSaaSであり、Bambuは3Dプリンタメーカーだ。しかしコアメカニズムは同じである。一企業がオープンソースという共有資源の上に自社のビジネスを載せておきながら、ユーザーがその企業の統制を回避しようとした瞬間 — それがHashimotoのように去る試みであれ、OrcaSlicer-bambulabの開発者のようにforkを作る試みであれ — 企業が持つ非対称な権力(ブランド・法務チーム・インフラの統制権)がそのユーザーへ向けられる。そしてその権力行使はほぼ常に合法だ。本稿はこの合法性と正当性のあいだの灰色地帯を覗き込む。

## 本論 1 — 何が起きたのか: BambuNetworkと強制クラウドの政治学

まずは事実関係から整理しよう。Bambu Labは2022年にX1シリーズでデビューした中国系3Dプリンタメーカーである。「ただ動く(just works)」というユーザー体験で市場を一気に侵食し、2025年頃にはデスクトップFDMプリンタ市場の事実上の標準の位置を占めた。同時に彼らは自社スライサーであるBambu Studioを配布してきたが、これはPrusaSlicerのforkであり、PrusaSlicerはSlic3rのforkだ。すべてAGPLv3ライセンスである。

Bambu Studioが人気を獲得したのち、コミュニティはさらにそのforkであるOrcaSlicerを生み出した。OrcaSlicerはBambu Studioのコードを取り込み、マルチベンダー対応とより多くのユーザーフレンドリーな機能を追加したforkだ。つまりBambu Labは、自社スライサーをPrusaSlicer forkとして作り、そのスライサーがさらにOrcaSlicerへとforkされたエコシステムの上でビジネスをしている。AGPLのコピーレフトの連鎖をそのまま引き継いだ形であり、ライセンス的には無瑕である。

亀裂が始まる地点はスライサーではなくネットワーク層だ。Bambuのすべてのプリンタは、BambuNetworkというクローズドなコンポーネントを介してクラウドと通信する。一般ユーザーがBambu Studioで印刷ジョブを送信すると、そのジョブはユーザーのLANを離れてBambuのサーバーを一度経由し、再び同じ家のプリンタに戻ってくる。これはリモートモニタリングとモバイルアプリ制御のための構造であるが、結果としてBambuはユーザーが印刷したすべてのSTLのメタデータを見ることになる。Geerlingが「私が印刷したものすべてを彼らは見ている(they can see everything you ever print)」と表現したのはこの点だ。

2025年1月、Bambuはさらに一歩踏み込んだ。Bambu Connectという新たな認証レイヤーを導入し、事実上すべてのプリンタ動作 — LANモードの印刷開始、ファームウェアアップグレード、カメラストリーミング、モーション制御 — にクラウド認証を要求するファームウェア更新を発表したのだ。当時の公式ブログ(現在はarchive.orgでも一部ブロックされている)に記された権限強制項目は次のとおりである。プリンタのバインド/アンバインド、リモートビデオアクセス、ファームウェアアップグレード、印刷ジョブの開始(LANまたはクラウドモード)、モーションシステム・温度・ファン・AMS設定・キャリブレーションなどあらゆる制御。Hacker NewsのユーザーghostpepperはこれをHN風に一行で要約した。「彼らは元々、LANモードの印刷にもクラウド認証が必要だと発表しており、バックラッシュを見てからその部分だけ撤回したのである(they originally announced cloud auth would be required even for printing locally in LAN mode, and only backpedalled on that when they saw the backlash)」。

バックラッシュを受けてBambuが落ち着かせた妥協案は、二つのモードの分離であった。「Cloud」モードでは全機能を使えるがBambu StudioまたはBambu Connectクライアントを必ず経由しなければならない。「LAN/Developer」モードではクライアント選択の自由は回復するがリモートモニタリングはすべて無効化される。Hacker Newsのbri3dが整理した表現が最も的確だ。「ユーザーが望んでいるのはケーキを食べつつ同時に持っていることだ — つまりローカルトークン認証とクラウド認証が同時に有効な状態(local token authentication and the cloud authentication enabled at the same time)である。それは現状のシステムでは不可能だ」。

OrcaSlicer-bambulabは、まさにその「不可能」を可能にするために作られたforkだ。このforkはBambu Studio Linux版に含まれる — つまりBambu自身がAGPLで公開した — コードをそのまま用い、OrcaSlicerの内側からBambuNetwork呼び出しを発生させられるようにする。結果としてユーザーはOrcaSlicerという自由なスライサーを使いつつ、Bambuのクラウド機能の一部を失わずに済む。Bambu Labの4月の発表は、まさにこのforkに対するcease and desistという形で出てきた。彼らはそのforkが「公式Bambu Studioクライアントであるかのように見せかけるために偽造された身元メタデータをネットワーク通信に注入した(injected falsified identity metadata into network communication)」と非難した。しかしそのfork開発者が反論したように、そのコードはBambu自身が公開したLinux版Bambu Studioのコードをそのまま使っただけだった。

ここまでが事実関係である。ライセンス違反はどこにも起きていない。AGPLは誰によるforkと再配布も許す。にもかかわらずGeerlingの記事タイトルが「abusing the open source social contract」である理由は、壊れたのがライセンスではなく、ライセンスの外側にあるある種の約束だからだ。その約束とは何か。

## 本論 2 — OSS社会契約の本質: ライセンスが守らないもの

オープンソースライセンスは本質的に二つを保証する。コードを読む権利と、コードを修正・再配布する権利。この二つは法廷で強制可能だ。しかしOSSエコシステムが30年にわたって築いてきたのは、この二権利だけではない。それは一種の非公式な社会契約であり、その契約はたいてい以下の項目から成る。

第一に、**相互性**。コミュニティのコードを利用する企業は、そのコミュニティに何らかの形で還元すべきである。それはパッチ貢献かもしれないし、資金援助かもしれないし、単なる信頼の表明かもしれない。

第二に、**力の行使の自制**。ライセンスが許す限り、ユーザーがコードをどのように使おうとも — 個人forkであれ商用forkであれ — 企業は法的脅迫というカードを軽々しく抜かない。ライセンスが許可した行為を企業が事後的に封じようとすれば、それは法的には可能であっても政治的にはシグナルとなる。

第三に、**ユーザー自律性の尊重**。ユーザーが買ったハードウェアはユーザーのものであり、ユーザーが買ったソフトウェアライセンスはその範囲内で自由に使えるべきだ。クラウド統合はオプションであるべきで、強制であってはならない。

Bambu Labの事例は、この三項目のうち第二と第三を真正面から侵している。第一の項目 — 相互性 — については彼らが部分的に守っているとも言える。Bambu Studio自体はAGPLで公開されており、Linuxビルドも提供される。しかしその公開コードを用いて作られたforkに対してcease and desistを送る瞬間、彼らは自らライセンスで付与した権利を、自らの手で取り戻そうとしていることになる。ライセンスのテキストはその「取り戻し」自体を阻止できない。法的脅迫のコスト — 弁護士費用、時間、精神的負担 — はfork開発者一人で背負うには重すぎるからだ。

Hacker Newsのコメント欄では、この非対称性が複数の角度から指摘されている。danielrmayはセキュリティの観点からBambuの主張を解体した。「『公式クライアントであるかのように見せかけた』という主張は、その仕組みがクライアント側のメタデータに依存しているのなら、セキュリティの議論にはなり得ない。それはimpersonationではなく、Bambuがユーザーエージェント文字列は認証ではないと発見しただけのことだ(That's not impersonation. That's Bambu discovering that user agents are not authentication)」。9cb14c1ec0は同じ筋で別の論点を突いた。Bambuがブログで「未認可のトラフィックの急増がサービス停止を引き起こした」と書いた部分について、「つまり自分たちのプリンタが人気だということが問題で、インフラをスケールさせる手間はかけたくないから、USER AGENT STRINGですべてをゲートしようというわけだ。この言い訳は信じられない(So it's a problem that their printers are popular, and they can't be bothered to scale their infra, so let's gate everything based on USER AGENT STRING!)」。

JoheyDev888はOSS社会契約を最も直截に呼び出した。「Bambu Studioは文字どおりPrusaSlicer forkだ。コミュニティの上に乗っておいてそのコミュニティを脅すことは許されない(Bambu Studio is literally a PrusaSlicer fork. You don't get to build on the community and then threaten it)」。この一文が社会契約の核心である。受け取ったものがあるならば、少なくともその受け取り元が定めた規範 — ライセンステキストではなくその規範 — の範囲内で振る舞うべきだ、ということだ。

Bambu側の弁明は二つの軸を持つ。第一に、未認可トラフィックがインフラを脅かすというセキュリティ的主張。第二に、許可なく作られたforkがそのfork利用者にとってセキュリティリスクになりうるという責任論的主張。両方とも表面的にはもっともらしい。しかしそれらの主張が正当化しようとする行為 — 単独のfork開発者に対する公開非難と法的脅迫 — との均衡が取れていない。daemonkがコメントで述べた「同意できないのは彼らの運用上の立場ではなく、彼らの処理の仕方である(I don't disagree with Bambu from an operational standpoint, but disagree with their handling of this)。ユーザーが非公認ソフトウェアで自社クラウドにアクセスしてほしくないなら、認証を実装した上で明示的にそう告げればよい」という指摘が、最も均衡の取れた評価に近い。

ここに4月のGitHub事件と5月のBambu事件の共通点が浮かび上がる。両社とも短期的には合理的かつ合法的な決定を下した。GitHubは30倍の負荷をさばくために価格政策を調整し、Bambuは自社サーバーの負荷を守るために認証レイヤーを強化した。しかし両決定とも、これまで企業が享受してきた — そして享受していることすら意識から外れていた — OSSコミュニティの好意をコストとして払っている。OSS社会契約の恐ろしさは、その契約が破られたときに即座の法的請求が発生しないという点にある。請求は数年後、企業が新規ユーザーを失い始めたときに、そして最も重要なことに、採用市場で企業の評判が落ちたときに到着する。

## 本論 3 — Forkが抗議の道具になる瞬間、しかしその限界

Bambuに対するコミュニティの応答は迅速だった。Cease and desistが知れ渡って数日のうちに、FULU Foundationという新しい非営利団体名義でOrcaSlicer-bambulabのミラーforkがGitHubに再アップロードされた。このforkのREADMEは簡潔だ。「このバージョンのOrcaSlicerはBambu Lab製プリンタに対するBambuNetwork対応を完全に復元する。あなたはLANのみに制限されない。以前と同じくインターネット越しにBambuNetworkで動作する(You are not limited to LAN only. It works over the internet just like before, through BambuNetwork)」。FULU Foundationは自らのスローガンとして「Fighting for Digital Ownership Rights」を掲げる。この表現は意図的だ。彼らは自分たちを単なるOrcaSlicer forkメンテナーではなく、デジタル所有権運動の一ノードと定義している。

Forkを抗議の道具として用いることはOSS史において新しいことではない。OpenOffice → LibreOffice、MySQL → MariaDB、Elasticsearch → OpenSearch、Redis → Valkey。いずれも親会社のライセンス変更やガバナンス決定に対する抗議として作られたforkであり、いずれもある程度親会社の方針に影響を与えた。OrcaSlicer-bambulabも同じ系譜に連なる。違うのは、このforkが食い止めようとしているのがライセンス変更ではなく、ライセンスの外側 — つまりクラウドAPIとファームウェア — の統制強化である点だ。

ここでfork戦略の決定的な限界が浮かび上がる。OrcaSlicer-bambulabはスライサーforkであってファームウェアforkではない。Bambuが次回のファームウェア更新でBambuNetwork APIの認証メカニズムを変更すれば — たとえば単純なユーザーエージェント検査ではなく、デバイス側で生成されたattestationトークンを要求するようになれば — このforkの回避メカニズムは即座に無効化される。コメント欄のmorphleがやや極端な表現で訴えた「Bambuファームウェアをゼロから書き直すアセンブリプログラマに我々が少しずつ寄付すべきだ」という主張は、まさにこの限界を指している。スライサーはforkできてもファームウェアはforkしにくいのだ。そしてファームウェアを統制する者が結局ハードウェアを統制する。

この点においてGitHub事例とBambu事例のあいだには重要な非対称がある。4月のGitHub事件への応答としてHashimotoは「去る」と宣言できたし、Codeberg・GitLab・セルフホストといった代替が(不完全ながら)存在する。SaaSは理論的には離脱できる。しかしBambu事例ではユーザーは既に買ったハードウェアから離脱できない。mrdoosunのコメントがこの点を整理している。「ここで重要なのは単にプリンタ対応ではなく、ユーザーが既に持つハードウェアをベンダーのクラウド経路なしで使い続けられるかどうかだ。ローカルネットワーク対応は失われるまでは便利な機能のように見える。失われて初めて、それが所有モデルの一部であったことが明らかになる(Local network support tends to look like a convenience feature until it disappears. Then it becomes obvious that it was part of the ownership model)」。

消費者側の応答としては市場ボイコットがある。1年前のBambuの最初のクラウド強制の試み以降、syntaxingがコメントに残したように「顧客として圧力をかけることが企業の方向性を動かす方法である(Putting pressure as a customer is how you steer company's direction)」。しかしこの圧力の弱点は明確だ。圧力が機能するには十分な数の新規購入者が別の選択をしなければならず、その別の選択肢には少なくとも比較可能なユーザー体験が必要だ。コメント欄での代替候補はPrusa、Snapmaker U1、Creality K2 Plusといった名前に収束するが、kn100が指摘したとおり「Bambuと同程度に『ただ動く』(just works)」体験を同価格で提供できる代替は現状存在しない。Prusaは高価で、その他は若干の学習コストを要求する。

この非対称 — 比較可能な代替の不在 — こそ、Bambuのような企業がOSS社会契約をコストなしに破ることのできる構造的理由である。企業は、自分が違反しても次の四半期の売上に大きな影響はないと知っている。そしてその事実が社会契約の最も弱い点だ。ライセンス違反は法廷が罰するが、社会契約違反は市場が罰する。そして市場が罰するためには市場が十分に成熟している必要がある。

## 結論 — 二つの破れ、ひとつの風景

冒頭に掲げた問いに戻ろう。一企業がオープンソースのコードを自社のクローズドなクラウドに統合し、そのクラウドの外へ出ようとするfork開発者に法的脅迫を送るとき、何が壊れたのか。

ライセンスは壊れていない。AGPLはそのままだ。Bambuの行為はAGPLのいかなる条項にも違反していない。fork開発者がBambu Studioのコードを利用したことも、AGPLが許容している。しかし壊れたのは、そのライセンスの上に30年かけて積み上げられてきた非公式な約束群 — 受け取った分だけ返すという相互性、ライセンスが許した行為を事後的に封じないという自制、ユーザーが買ったハードウェアはユーザーのものであるという自律性 — である。これらの約束はどこにも明文化されておらず、いかなる法廷も強制しない。それが弱点だ。

しかし、その弱点が即ち無力さを意味するわけではない。FULU Foundationのforkが登場初週で1.7kスター、423個のforkを集めたという事実は、これらの約束がコードの一行一行に刻まれていなくとも、コミュニティの記憶に刻まれていることを示している。Louis Rossmannがそのfork開発者の法的費用のために即座に1万ドルを約束したのも同じ文脈である。社会契約は法によって強制されないが、誰かがそれを破ったときにその違反を記録し抗議する社会的メカニズムは作動する。

4月のGitHubと5月のBambu、二つの事件の共通したメッセージは結局こうだ。企業がOSSの上でビジネスを行うということは、ライセンスを守る以上の義務を負うということを意味する。その義務を守らない自由も企業にはあるが、その自由の行使は無料ではない。請求書はこの四半期ではなく数四半期先に、新規ユーザーが他の選択肢を検討し始めるときに、そして最もゆっくりと — しかし最も確実に — 既存ユーザーが次の購入で別ブランドを検討するときに到着する。Bambuがその請求書を受け取るまでにどれくらいかかるかは分からないが、その請求書が届いた瞬間に最初に思い起こされる名前は、OrcaSlicer-bambulabのあの単独開発者であろう。

---

参考:

- Jeff Geerling, "Bambu Lab is abusing the open source social contract," 2026-05-12. https://www.jeffgeerling.com/blog/2026/bambu-lab-abusing-open-source-social-contract/
- Hacker News discussion, item 48109224, 2026-05-12. https://news.ycombinator.com/item?id=48109224
- FULU-Foundation/OrcaSlicer-bambulab, GitHub repository. https://github.com/FULU-Foundation/OrcaSlicer-bambulab
- Hacker News discussion, "Restore full BambuNetwork support for Bambu Lab printers," item 48115127. https://news.ycombinator.com/item?id=48115127
- FULU Foundation, https://www.fulu.org/
- Bambu Lab firmware update notice (referenced via archive.org), https://blog.bambulab.com/firmware-update-introducing-new-authorization-control-system/
