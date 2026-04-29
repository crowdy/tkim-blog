---
title: "GitHub神話の6日間 — ガバナンス、稼働率、セキュリティ、コストが同時に揺らいだ一週間"
description: "2026年4月最終週、我々がコードを預けてきた単一プラットフォームは偶然運が悪かったのか、それとも18年分の請求書が一気に届いただけなのか。"
pubDate: 2026-04-29T00:00:00.000Z
lang: ja
pairSlug: github-cracking-week
draft: false
---

# GitHub神話の6日間 — ガバナンス、稼働率、セキュリティ、コストが同時に揺らいだ一週間

> 今週のGitHubは運が悪かったのか、それとも18年分の請求書が一気に届いたのか。そしてその違いを我々が見分けられないのだとしたら、我々が依存していたのはインフラだったのか、それとも神話だったのか。

## 導入 — キーボードの上の涙

2026年4月28日、Mitchell Hashimotoは自身のブログに「Ghosttyは GitHub を離れる(Ghostty is leaving GitHub)」という記事を投稿した。HashiCorpの共同創業者であり、自分の名前を検索エンジンに入れれば「GitHub ユーザー番号 1299」という結果が返ってくる人物である。2008年2月に登録したのだから、18年間ひとつのプラットフォームで仕事をしてきたことになる。彼は自分の記事に直接コメントをぶら下げた。「この投稿を書きながら本当に泣いた。涙がキーボードに落ちた。恥ずかしいが事実だ(I actually cried writing this blog post — tears hit my keyboard, I'm embarrassed to say)」。

彼が挙げた理由は、意外にもシンプルだった。「ここ一ヶ月、ほぼ毎日にXを書き込んでいた」。彼が個人的に付けていた稼働率の日誌には、GitHubが自分の作業をブロックした日にXが付けられており、そのXがほぼすべての日付に付いていた。4月27日にはGitHub Actionsの障害により、約2時間のあいだPRレビューが不可能になった。彼はその2時間を、単なるダウンタイムではなく人格的な問題として受け止めた。「GitHubは毎日のように私を失敗させており、それは個人的なことだ(GitHub is failing me, every single day, and it is personal)」。

この記事がHacker Newsの一面に上がった4月28日の夕方、同じページにはGitHub自身による稼働率に関する謝罪ポスト、GitHub Enterprise ServerのRCE(リモートコード実行)脆弱性の解説、GitHub Copilotコードレビューの課金ポリシー変更告知、そして「GitHub Actionsこそが最も弱い環(GitHub Actions is the weakest link)」というセキュリティ分析記事が同時に並んでいた。数日のうちにGitHubは、ガバナンス、稼働率、セキュリティ、コスト、サプライチェーン健全性という五つの軸で同時に揺らいだ。単一の事件ではなく、同時多発的な亀裂であった。

では、単一の事件と同時多発的な亀裂の違いはどこにあるのか。一つが崩れたのなら事故だが、五つが同じ週に崩れたのなら構造が露呈したことになる。今週のGitHubで起きたことは、後者に近い。

## 6日間の年表 — 何が起きたのか

まず事実関係を時系列で整理しよう。

**4月23日。** GitHub Merge Queueにおいて squash merge が誤ったコミットを生成し、658のリポジトリ、2,092のプルリクエストの既定ブランチを不正な状態に残した。GitHub CTOのVlad Fedorovは数日後の公式ブログで「複数のプロセス障害(multiple process failures)」が原因であったと認め、「データ損失はなかったが、影響を受けたデフォルトブランチの状態は不正確だった」と書いた。

**4月27日。** ふたつの出来事が同じ日に起きた。第一に、Elasticsearchベースで動作するGitHub検索が落ちた。Fedorovは「ボットネット攻撃と推定される負荷」が原因であったと述べた。第二に、同日GitHubは Copilot Code Review が6月1日からGitHub Actions分(minutes)を消費することになると告知した。ユーザーは同一のコードレビュー機能に対して、Copilotプレミアムリクエスト単位とActions分という二重課金にさらされる。単価は告知に明記されていない。

**4月28日。** セキュリティ企業WizがCVE-2026-3854と名付けられたGitHubのリモートコード実行脆弱性を公開した。CVSSスコアは8.7、等級はCritical。影響範囲はGitHub.comとGitHub Enterprise Server(GHES)全体。公開時点でGHESインスタンスの88%が未パッチのままであった。同日、Mitchell Hashimotoはブログに別れの記事を投稿し、Armin Ronacherは「GitHub以前(Before GitHub)」という回想録を発表し、あるセキュリティ研究者は「GitHub Actions こそが最も弱い環」という記事で91%という衝撃的な数字を提示した。

**4月29日。** Hacker Newsの一面トップ5のうち4本がGitHub関連のポストで埋まった。スコアは記事ごとに200点から2,000点の幅、コメントは一本あたり100件から600件超に達した。

これを単なる偶然と見るには、事件相互の因果の筋が濃すぎる。一軸ずつ深く掘り下げてみよう。

## 本論 1 — ガバナンス: 「このサイトにはリーダーシップがない」

Mitchell Hashimotoはインフラを移すと言った。Armin Ronacherはそこから一歩先まで進んだ。FlaskおよびJinjaのメンテナーであり、Pocooグループの創始者である彼は、「このサイトにはリーダーシップがない(the site has no leadership)」と断言する。「これだけうまく回っているのが奇跡だ(It's a miracle that things are going as well as they are)」。この一文が衝撃的なのは、それが怒りの表現だからではなく、正確な観察である可能性が高いからだ。

GitHubの経営構造は、2018年のMicrosoft買収以降、何度も再編されてきた。前任CEOのThomas Dohmkeは2026年8月に辞任して後任を発表せず、その後GitHubはMicrosoftのCoreAI組織に統合された。CEOの椅子は実質的に空席に近く、意思決定はMicrosoft本社のAI戦略の流れに従属する形になった。この構造の中で起きた最初の結果が、ほかでもないCopilot課金ポリシーの曖昧さである。4月27日の告知は「エージェント・アーキテクチャがGitHub Actionsの上で動作するため(That agentic architecture runs on GitHub Actions)」、今後はそちらに課金すると書くだけで、分単価も、平均PRあたりの消費量も、既存Copilot契約との合算上限も公開していない。ユーザーは請求書が届いて初めて値段を知ることになる。

価格政策の不透明さは、単なるマーケティングの失策ではない。それはガバナンス不在から生じる症状である。誰も「このやり方ではユーザーが離れる」と言う権限を持たないか、あるいは言っても影響力を持たないとき、価格は合意ではなく通知になる。

ここでHashimotoの判断が意味を帯びてくる。彼は単に一人のユーザーが怒ったのではなく、18年間そのプラットフォームの成長を傍で見守ってきた人間の判断だ。彼が「どの代替プラットフォームに移るかはまだ決めておらず、商用・FOSSの双方と協議中だ」と書いた箇所が示唆的である。彼は今すぐ離れたいのではなく、移る先が用意でき次第すぐに離れる準備をしているのだ。18年来の常連がそう言うとき、他の常連たちも同じメモを受け取る。

## 本論 2 — 稼働率とセキュリティ: 30倍の負荷、88%の未パッチ

Vlad Fedorovの謝罪ポストの中に、ただ一文ながら今回の亀裂全体を説明する因果命題が含まれていた。「エージェント型開発ワークフロー(agentic development workflows)が2025年12月以降加速し、30倍の容量拡張が必要になった」。すなわち、ChatGPT CodexやClaude Code、Cursorといったコーディングエージェントたちが自動でPRを作り、CIを回し、レビューを要求し始めたことで、GitHubのインフラには人間ユーザーだけでは到達し得なかった水準の負荷がかかり始めた、ということである。そしてその負荷は、GitHubがこれまで先送りしてきたあらゆるアーキテクチャ的負債を請求書に変えて突きつけた。

Fedorovが約束した改善項目のリストは、その意味で示唆に富む。WebhooksをMySQLから分離する、セッションキャッシュの再設計、認証フローの最適化、そして決定的に「パフォーマンスにセンシティブなコードをRubyモノリスからGoへ移行する」。18年もののモノリスをいまになって解体し始めるという事実は、30倍負荷という外圧がなければさらに先送りされていた仕事だということを意味する。

セキュリティ側に目を向けると、絵はさらに暗くなる。CVE-2026-3854はWiz Researchが発見し、3月4日にGitHubに通報した脆弱性である。GitHub.comはわずか6時間でパッチを当てた。素早い対応である。ところがGitHub Enterprise Server(顧客企業が自社運用するバージョン)向けパッチは3月10日になってようやく出され、4月28日の公開時点でインスタンスの88%が依然として未パッチのままであった。認証済みユーザーの単一の `git push` コマンドだけでRCEが可能な脆弱性が、一ヶ月半にわたって大企業ネットワークの随所に晒された状態で放置されていたことになる。

この88%という数字は、単にGHES運用者の怠慢を意味するものではない。それは、自社運用GitHubという選択肢が次第に運用負荷を支えきれなくなりつつあるというシグナルでもある。SaaS版GitHubは6時間でパッチされるが、自分の手で運用すると一ヶ月半かかる、というこの非対称は、結果として「GitHub.comから離れろ」という助言と「自前で運用しろ」という助言を同時に難しくする。

GitHub Actionsの絵はさらに構造的だ。nesbitt.ioに掲載された分析は、「製品全体が、それぞれ単体では便利な機能の寄せ集めであり、それらを組み合わせると非常に危険な何かになる」と診断する。具体的な数字も並ぶ。サードパーティのGitHub Actionsを使うPyPIパッケージの91%が、ミュータブルなタグ(mutable tag)経由でアクションを参照している。パッケージの3分の2は、少なくとも一つのワークフローに `permissions:` ブロックを記述していない。その結果はすでに請求書として届いている。2025年3月の tj-actions/changed-files 侵害は23,000の下流リポジトリにメモリスクレイパーを流し込み、同年8月の nx/s1ngularity 事件は5,000以上の非公開リポジトリを一時的にパブリック化させた。2026年4月の elementary-data 事件では、PRコメント・トリガから10分以内に悪性リリースが公開された。

これらすべての事例に共通するのは、いずれも「バグ」ではないという点である。それらはGitHub Actionsの既定動作が生み出す合法的な結果だ。SHAではなくタグでアクションを参照することは推奨されている使い方であり、`pull_request_target` は公式ドキュメントに記載されたトリガであり、デフォルトの GITHUB_TOKEN が書き込み権限を持つことは2023年2月以前に作られたあらゆるリポジトリのデフォルト値である。すなわち、GitHub Actionsのセキュリティ問題は「ユーザーが間違った使い方をした」のではなく「デフォルトが危険である」ところに根がある。

## 本論 3 — 依存の請求書: 我々はどこへ行くべきか

加えて、同じ週にもう一件、見逃せない事件が同時に起きていた。4月28日、Anthropicの Claude.ai と APIが広範囲にダウンしたのだ。コーディングエージェントがGitHubのインフラを30倍負荷で押し潰しているのと並行して、そのエージェントの脳である言語モデル自体も同時に倒れている、ということである。言い換えれば、今週我々が目撃したのは、二つの単一障害点(SPOF)が同時に揺らいだ風景だ。コードのSPOFはGitHubであり、コーディングエージェントのSPOFはモデル提供者である。

Hacker Newsのコメント欄では、GitHub社員と思しき idan というユーザーがこう述べた。「GitHubは、変化を起こしたいと思う人たちが内側に留まることでしか良くならない(GitHub only gets better if people who give a shit stick around to make it better)」。これに対して margalabargala は断固として答えた。「これまで使ってきたやり方をそのまま使い続けることでGitHubを良くする道はない(There is no avenue by which you make GitHub better by continuing to use it)」。この二つのコメントの対立は、外部ユーザーの影響力に関するもっとも率直な記述である。製品の方向は、ユーザーの涙ではなく、ユーザーの財布と足跡によって決まる。

ではどこへ行くべきか。コメント欄に登場した候補を整理するとこうなる。

第一に、**Codeberg**。Forgejo ベースの非営利フォージである。すでに Zig、Strudel、Tenacity といった知名度のあるプロジェクトが移行している。短所はディスカバリ面で、GitHubほどの検索・SEO・統合エコシステムを提供できない点だ。

第二に、**GitLab**。同コメントの ahartmetz の表現を借りれば「GitHubと同じくらい遅いが、ライセンスとオーナーがマシだ(about as slow as GitHub, but with a better license and owner)」。すなわち、機能的には安全な代替だが、インフラ的な満足を約束するわけではない。

第三に、**自前ホスティング(Forgejo, Gitea, sr.ht)**。最も理想的な分散化だが、GHESの88%未パッチ統計が示すとおり、運用負荷は決して軽くない。さらにHacker Newsの injidup が指摘するように、「分散バージョン管理は、分散したリポジトリを発見しアクセスする手段がある場合にだけ機能する。結局、常に中央レジストリへのドリフトが起きる」。すなわち self-host は発見可能性を諦めることでもある。

Armin Ronacher はそこで、もう一つの方向を提示する。新しいフォージを探すのではなく、「公的で、退屈で、十分に資金が付いた保存インフラ(public, boring, well-funded archive)」を作るべきだという主張である。コードのホスティングは商用企業がやってもよい。だがコードの記憶 — すなわち過去のプロジェクト、死んだ依存関係、切れたリンク — は、いかなる一企業のビジネスモデルの中にも閉じ込められるべきではない、ということだ。彼自身がかつて作ったものの忘れ去った旧プロジェクト Colubrid が、PyPIに死んだGitHubリンクを引きずったまま登録されている、という逸話は、この主張の根拠であり象徴でもある。

エンジニア個人レベルで今すぐ取れる行動は、より小さな単位から始まる。nesbitt.io の推奨を要約すれば、五点に圧縮できる。zizmor のような静的解析ツールをワークフローに導入すること。アクションをタグではなくSHAでピン留めすること。ワークフローの最上段に `permissions: {}` を置き、必要な権限だけを足していくこと。`pull_request_target` を使わないこと。認証されていないユーザーがPRに記述しうるあらゆるテキストを、最終的にシェルスクリプトになると仮定すること。この五点は、GitHubを離れずとも、GitHubが我々のインフラの最も弱い環にならないようにする最低限の保険である。

## 補強 — `pull_request_target` トリガの落とし穴

この五つの推奨のうち、現場のエンジニアにとって最も曖昧に映るのは四点目である。「`pull_request_target` を使うな」とだけ書かれているが、ではどのトリガを使えばよいかは書かれていない。しかしGitHub Actions事故のほぼすべての事例がこのトリガの誤用から始まるという事実を踏まえると、この一行は別途解きほぐしておく価値がある。

要点はシンプルだ。デフォルトのトリガは `pull_request` であり、secretsが本当に必要な場面では `workflow_run` パターンに分離する。

**`pull_request` と `pull_request_target` の違い**

| トリガ | 実行コンテキスト | secretsアクセス | GITHUB_TOKEN | forkからのPRコード実行 |
|---|---|---|---|---|
| `pull_request` | PR HEADコンテキスト | 空 | read-only | 安全に実行される |
| `pull_request_target` | baseブランチコンテキスト | フルアクセス | 書き込み可 | 危険 — RCEの常連入口 |

`pull_request` は「forkのコードが実行されても盗まれるものがない」トリガである。シークレットが空でトークンが読み取り専用であるため、外部コントリビュータのコードが実行されてもベースリポジトリに影響を及ぼさない。一方 `pull_request_target` はbaseコンテキストで実行され、すべてのsecretsと書き込み権限付きのトークンを受け取る。それ自体は誤りではないが、ワークフローがPR HEADコードをチェックアウトして実行した瞬間 — 例えば `actions/checkout` に `ref: ${{ github.event.pull_request.head.sha }}` を指定した瞬間 — 外部の人間のコードがsecretsを手にしたまま実行される。2025年のtj-actions/changed-files事件が23,000のリポジトリを一気に揺るがしたメカニズムは、まさにこれである。

**パターン1 — 基本形: `pull_request` だけで足りる場合**

lint、テスト、ビルドのようにsecretsを必要としない作業はすべて、このトリガ一つで十分である。

```yaml
on:
  pull_request:
permissions: {}
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<SHA>
      - run: npm test
```

forkからのPRであっても安全だ。トークンが読み取り専用でありsecretsが空であるため、悪性コードが実行されても外部に流出するデータが存在しない。

**パターン2 — secretsが必要な場合: `workflow_run` で分離**

デプロイプレビューなどsecretsを必要とするシナリオは、二段階に分割する。最初のワークフローはuntrusted環境でビルドのみを行い、成果物をartifactとしてアップロードする。次のワークフローがそのartifactを受け取り、secretsと共に処理する。

```yaml
# pr-build.yml — untrusted, secretsなし
on: pull_request
permissions: {}
jobs:
  build:
    steps:
      - uses: actions/checkout@<SHA>
      - run: npm run build
      - uses: actions/upload-artifact@<SHA>
        with: { name: build, path: dist/ }
```

```yaml
# pr-deploy-preview.yml — trusted, secretsあり
on:
  workflow_run:
    workflows: ["pr-build"]
    types: [completed]
permissions:
  pull-requests: write
jobs:
  deploy:
    if: github.event.workflow_run.conclusion == 'success'
    steps:
      - uses: actions/download-artifact@<SHA>
      - run: ./deploy-preview.sh
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

肝心なのは、secretsに触れる段階でPR HEADコードを決して実行しないという点である。二つ目のワークフローは、最初のワークフローが生成した静的なartifactしか扱わない。

**パターン3 — `pull_request_target` を正当に使えるほぼ唯一の場合**

ラベル自動付与、ウェルカムコメントなど、PR HEADコードをまったく実行しない自動化に限定される。

```yaml
on: pull_request_target
permissions:
  pull-requests: write
jobs:
  label:
    steps:
      - uses: actions/labeler@<SHA>
```

このワークフローに `actions/checkout` でPR HEADを取得し、ビルドや実行を追加した瞬間、その場で事故が始まる。

**一行ルール**

> 「このワークフローは外部コントリビュータがPRに記述したコードを実行するか?」
> → YESなら `pull_request`(必要に応じて `workflow_run` と組み合わせる)。
> → NO(ラベル・コメントのみ)なら `pull_request_target`。

nesbitt.ioが「`pull_request_target` を使うな」と断定したのは、実務でこの境界を守れているワークフローがほとんど存在しないからである。一度でもPRコードをチェックアウトすればその瞬間にsecrets漏洩が発生し、その事故は単一リポジトリに留まらず、ダウンストリームの依存ツリー全体へと伝播する。

## 結論 — 神話の終わり、インフラの始まり

冒頭の問いに戻ろう。今週のGitHubは運が悪かったのか、それとも18年分の請求書が一気に届いたのか。

答えは両方である。一週間に五つの事件が重なったのは偶然だ。しかし、その五つの事件がガバナンス、稼働率、セキュリティ、コスト、サプライチェーン健全性という、ちょうど五つの異なる軸で同時に揺らいだということは、偶然ではない。18年のあいだ我々が、一社の一SaaSにコード、イシュー、CI、パッケージレジストリ、保存アーカイブ、そしていまやコーディングエージェントの実行ランタイムまでを預けてきた、という事実の自然な帰結である。

神話は普通、ある一つの事件で崩れたりはしない。神話は、人々がそれを神話と呼ばなくなったときに崩れる。4月28日にMitchell Hashimotoがキーボードに落とした涙は、彼が最後までGitHubを神話と呼んでいた人間の一人だったことの証拠である。彼がそれを神話と呼ぶのをやめた瞬間、他の人間たちも同じ疑問を抱き始める。

来週には一面がまた別の話題で埋まるだろう。来月にはGitHubの30倍スケーリング作業が幾分か実を結ぶかもしれない。だが、今週の6日間は一つの事実を恒久的に変えてしまった。我々はもうGitHubを「当たり前のもの」ではなく「一つの選択」として見るようになった、ということだ。一つの選択として見るということは、別の選択肢を検討し始めたということである。

そうすると、最後の問いはこう言い換わる。次にこのような一週間が訪れたとき、あなたのチームはどこへ移る準備ができているのか。

---

出典:

- Mitchell Hashimoto, "Ghostty is leaving GitHub," 2026-04-28. https://mitchellh.com/writing/ghostty-leaving-github
- Vlad Fedorov, "An update on GitHub availability," GitHub Blog, 2026-04-28. https://github.blog/news-insights/company-news/an-update-on-github-availability/
- Wiz Research, "GitHub RCE Vulnerability: CVE-2026-3854 Breakdown," 2026-04-28. https://www.wiz.io/blog/github-rce-vulnerability-cve-2026-3854
- "GitHub Copilot code review will start consuming GitHub Actions minutes on June 1, 2026," GitHub Changelog, 2026-04-27. https://github.blog/changelog/2026-04-27-github-copilot-code-review-will-start-consuming-github-actions-minutes-on-june-1-2026/
- "GitHub Actions is the weakest link," nesbitt.io, 2026-04-28. https://nesbitt.io/2026/04/28/github-actions-is-the-weakest-link.html
- Armin Ronacher, "Before GitHub," lucumr.pocoo.org, 2026-04-28. https://lucumr.pocoo.org/2026/4/28/before-github/
- Hacker News discussion, "Ghostty is leaving GitHub," item 47939579, 2026-04-28. https://news.ycombinator.com/item?id=47939579
