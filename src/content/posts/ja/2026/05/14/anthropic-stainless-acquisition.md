---
title: "Anthropic が Stainless を買った理由 — LLM 会社が SDK ジェネレーターを買い込む時代"
description: "Stainless のホスト型 SDK ジェネレーターは 5月 18日付で終了する。Anthropic が買ったのは会社というより Alex Rattray とエンジニアチームだ。「agents are only as useful as what they can connect to」の一文が指す新しい競争軸は、モデルではなく SDK・ツール・MCP の厚みである。"
pubDate: 2026-05-14T00:00:00.000Z
lang: ja
pairSlug: anthropic-stainless-acquisition
draft: false
---

# Anthropic が Stainless を買った理由 — LLM 会社が SDK ジェネレーターを買い込む時代

> Anthropic はなぜ自社 API SDK をずっと作ってきた外部会社を丸ごと買い取ったのか。そしてその会社の中核製品である「ホスト型 SDK ジェネレーター」を、買収と同じ日に終了させた決定は何を意味しているのか。

## 導入 — 「acquihire」だけでは足りない取引

5月 18日、Anthropic は短いブログ記事ひとつで Stainless 買収を発表した。Stainless は 2022年創業の小さな会社で、OpenAPI 仕様から TypeScript・Python・Go・Java・Kotlin の SDK と MCP サーバーを生成するサービスを売ってきた。発表の趣旨は二行で要約できる。第一に、Stainless は Anthropic の最初の SDK 以来、すべての公式 SDK を作ってきた。第二に、「エージェントはそれが接続できるものと同じ分だけ有用である(agents are only as useful as what they can connect to)」。買収条件は非開示である。

24 時間以内に Hacker News の買収スレッドは 332 ポイント、232 コメントを集めた。本当のニュースはそこにあった。別の告知に短く書かれた一文、「Stainless のホスト型製品は、SDK ジェネレーターを含めて終了する。本日より新規サインアップ、新規プロジェクト、新 SDK の発行は停止する(we'll be winding down all hosted Stainless products, including our SDK generator. Starting today, new signups, projects, and SDKs will not be available)」。HN ユーザーの drewda は一行でまとめた。「結局これは acquihire だ。」もうひとりの kristjansson はもっと鋭い。「これは OpenAI の表玄関を買い取って EOL にすると宣言したように読める。」

ここに本当の分析素材がある。Anthropic が買ったのは会社ではなく、エンジニアチームとそのチームが握っていたパターンであり、買い取ったその会社の中核製品を同じ日に終了させた。この種の取引には通常ふたつの解釈がある。ひとつは単なる人材買収。もうひとつは、自社の競争インフラが外部に縛られているリスクを内部に取り込む作業である。今回の取引は明らかに後者だ。そしてその背景には、5月に入って誰でも OpenAPI 仕様一枚から SDK を「vibe coding」できるようになった市場変化が横たわっている。

本稿はこの背景を三段階で追う。まず Stainless の製品とは正確に何だったのか。次になぜ LLM モデル会社が SDK ジェネレーターを買わねばならなかったのか。最後にこの取引が LLM 市場の新しい競争軸について何を示しているのか。

## 本文 1 — Stainless は正確に何を売ってきたのか

Stainless は 2022年に Alex Rattray が創業した会社である。同年、OpenAI が ChatGPT API を公開する直前だった。Rattray が発表文に残した一行はシンプルで本質的だ。「SDK はそれが包む API と同じくらいの注意を払う価値がある(SDKs deserve as much care as the APIs they wrap)。」この一文は 2022年当時、傍流の見方だった。当時の API 会社の多くは OpenAPI 仕様さえ整えれば SDK は副産物だと考えていた。swagger-codegen や openapi-generator のようなオープンソースがあり、気に入らなければ自分で手直しすればよい、と。

Stainless はその常識に真逆のベットをした。SDK はユーザーが API に初めて触れる表面であり、その表面の品質が API の採用率を決める、と。同社のジェネレーターはただの変換ツールではなかった。同じ OpenAPI 仕様から出発しつつ、各言語の慣用に合わせた SDK を自動生成しつつ、ページネーション・リトライ・ストリーミング・型推論・async/sync 派生・エラー階層まで言語ごとに作り分ける道具だった。Mux の GeneticGenesis は HN コメントで「Mux ではかなり初期から彼らの Node SDK ジェネレーターを使い、その後 TypeScript ジェネレーターも使った。製品はうまく動いた(was an early adopter of their Node SDK generator at Mux, and the product worked great)」と書いている。

最大の顧客は OpenAI だった。OpenAI の公式 Python SDK と Node SDK は Stainless のジェネレーターで作られていた。HN の kristjansson が「OpenAI の表玄関を買い取った」と表現したのはそのためである。Anthropic の公式 SDK も最初から Stainless が作ってきた。Cloudflare、Plaid、Mux のような会社も同じ道具を使っていた。つまり Stainless は「AI 時代の API における SDK インフラ」を事実上独占に近い形で握っていた会社だ。

この会社が Anthropic に売却される直前、市場では何が起きていたか。2025年後半以降、OpenAPI 仕様さえあれば Claude Code、Cursor、GitHub Copilot のような道具がきれいな SDK を 1〜2 時間で吐き出すようになり始めた。HN の GeneticGenesis は同コメントの後段でこの流れを指摘する。「今は OpenAPI 仕様から SDK を vibe coding するのが非常に簡単で魅力的だ。多くのチームがその方向に進むだろう(it's very tempting and easy to vibe code SDKs from a OpenAPI spec files right now. I would think a lot of teams will just go in that direction)。」Stainless が積み重ねたディテール — リトライ方針、ページネーションのヘルパー、型安全性 — のうち相当部分が、LLM のコード生成で十分置き換え可能な水準まで降りてきた、ということだ。

ここに Stainless の事業的危機があった。ホスト型 SDK ジェネレーターを SaaS として売ってきた会社にとって、同じ成果物を LLM が無料に近いコストで吐き出し始めると、価格圧力は急峻に下がる。会社としての成長曲線が折れかねない時期に、市場最大の顧客が丸ごと買うと言ってきた。会社にとっても合理的な取引である。

## 本文 2 — なぜ LLM 会社が SDK ジェネレーターを買う必要があったか

Anthropic の発表文で最も重い一行は短い。「Agents are only as useful as what they can connect to。」この一文は Anthropic の今後の戦略の中心を正確に指している。モデルがどれだけ賢くなろうと、そのモデルが呼び出せる道具と API とデータソースの厚みが薄ければ、実用価値は固まらない。2025年 11 月に発表された MCP(Model Context Protocol)と、その上に積み上がる道具エコシステムは、この厚みを直接増やす試みだった。5月の Stainless 買収はその試みの次の四半期である。

Anthropic の立場から見れば、SDK はもはや副産物ではなく戦略資産である。理由は三つに分けられる。

第一に、Claude のツール呼び出し仕様と MCP インターフェースが事実上の業界標準として固まりつつある点だ。5月に入って Microsoft の Copilot Studio が MCP を受け入れ、Google の Gemini Code Assist も MCP 互換を発表した。この流れが固まれば、ある会社が自社 API を LLM エージェントから呼ばせたいと考えるとき、MCP サーバーを作るのか SDK だけを作るのかを選ぶことになる。そして両方を一度に生成してくれる道具こそ Stainless のジェネレーターだった。Anthropic の立場では、自分が定義した標準にもっとも合う形で SDK と MCP サーバーを吐き出す道具が、外部会社の手中にあるという事実そのものが不安要因だ。

第二に、競合の OpenAI 公式 SDK も同じ会社が作っていた。この事実は Anthropic にとって微妙な弱みだった。自社 SDK の品質を外部会社に依存しつつ、その外部会社が競合の SDK も同じパターンで作っているという構図である。HN の pplante は「agentic コーディング道具が walled garden へ変わっていく流れを目にしている気がする(I feel like we are seeing agentic coding tools morph into walled gardens with these acquisitions)」とコメントした。今回の取引はその流れの一事例だ。Anthropic は自社 SDK インフラを内側に引き込み、ディテールを自社標準に最適化できる位置へ移した。副次効果として、OpenAI の公式 SDK が同じ道具上で作られているという非対称性が解消される。

第三に、「エージェントが接続できるものの厚み」がモデル性能より決定的な変数になる時点が近づいている。Anthropic の Claude Code が OpenAI の Codex や Google の Gemini Code Assist に対して比較優位を示している領域は、モデル自体の推論力ではなく、シェルコマンド・ファイル道具・MCP サーバー・権限モデルといった運用ディテールだ。この比較優位を固めるには、外部会社が SDK を作るときに Anthropic のパターンに従わせるだけでは足りない。自社で SDK を作り、外部会社が自分の API を素早く Claude に接続できるようにするインフラを、自社の手のうちに置く必要がある。Stainless のエンジニアチームとコード資産はそのインフラの中核である。

ただし今回の取引には可視的なコストもはっきりある。HN コメントで頻出した単語は「petty and pointless」だった。既存顧客の SDK が突然 EOL の知らせを受けたという事実がその感情を生んだ。kristjansson のコメントはその感情を正確に書く。「既存ユーザーと SDK についてもう少し明確な情報を出すべきだった。それがないとこの発表は『OpenAI の表玄関を買って EOL にする。これからは使わないでくれ』と読める。」Anthropic は買収価値を短期では人材で、長期ではパターンと標準の内製化で回収するだろう。だが短期的には、Stainless のホスト型製品を使っていた数百社が新しい SDK 道具を探さねばならない。5月から 6月にかけて彼らがどこへ移るかが、市場の均衡をもう一度揺らす。

## 本文 3 — 新しい競争軸：モデルではなく SDK・ツール・MCP の厚み

ここで一歩下がって LLM 市場全体を見よう。2023年から 2025年初頭まで、モデル会社の競争軸は単純だった。誰がより良いモデルを早く出すか。GPT-4 と Claude 3 と Gemini 1.5 が順に自分の番を取った時期だ。その時期の M&A は主に GPU・データ・研究者に集中した。Anthropic の Stainless 買収はそのパターンに収まらない。これはモデル会社が SDK インフラを自社内に取り込んだ最初の事例である。

この変化の背景にはモデル性能曲線が平坦化しているという認識がある。5月に入って Anthropic、OpenAI、Google がそれぞれ新モデルを発表したが、ベンチマーク点数の分布は徐々に狭まっている。Qwen 3.7 Preview は Arena で Anthropic のモデルと張り合える位置に入ってきた。ユーザーから見て「モデルが一段良くなった」ことが決定的な変数でなくなる時点が近づいている。すると会社の競争軸は、モデルではなくそのモデルを取り囲むインフラ — ツール呼び出し仕様、MCP エコシステムの厚み、SDK の品質、権限モデルの安全性、コスト可視化の精度 — へ移る。

この移動を Anthropic はもっとも早く認識し、行動に移した会社だ。昨年 11 月に MCP をリリースして、外部会社が自社 API を Claude に接続するための標準通路を敷いた。5月の Stainless 買収はその通路の施工能力を自社内に持ち込む決定である。外部会社が自社 API を MCP サーバーとして公開したいとき、Anthropic が直接作った道具で SDK と MCP サーバーを同時に吐き出してやれるなら、Anthropic のツールエコシステムは一気に最も厚くなる。OpenAI の Codex が同じ作業をしようとすれば、外部道具に依存するか、別途同種の買収をするしかない。時間は Anthropic 側が先に稼いだ格好だ。

とはいえこの決定に危険がないわけではない。SDK 生成を一社に集約するということは、その会社がパターンを定義する立場になるということで、パターンが自社エージェントのインターフェースに深く縛られすぎると、他のモデル会社がそのパターンを模倣するのを嫌がるようになる。すると結局、自分しか使わない狭いインターフェースに閉じ込められる。標準になるには一定の開放性が要る。MCP がこれまで急速に採用されてきたのは、インターフェースが十分にシンプルで開かれていたからだ。Stainless の資産を吸収したのちにも、その資産を自社 SDK だけでなく外部会社の SDK と MCP サーバー生成にも開いておけば、新しい標準のゲートキーパーの座は固まる。閉じてしまえばその座も崩れる。

他の LLM 会社が今回の取引を見て同様の決定を下す可能性も高い。OpenAI は自社公式 SDK を別の道具へ移す作業を急がねばならない。自前の買収か内製かの選択は近いうちに決まる。Google の Gemini チームも自社 SDK インフラに手を入れるだろう。Cohere、Mistral、Together AI のような会社は外部 SDK ジェネレーターに強く依存してきたが、この市場が突然空けば、その隙間を埋めようとする小さな会社が入り込む。HN のあるコメンターが「これは sdks-as-a-service 市場まるごとの再編の信号だ」と書いた理由である。

## 結論 — SDK がモデル会社の戦略資産になった瞬間

冒頭の二つの問いに戻ろう。Anthropic はなぜ Stainless を買ったのか。そして同じ日にその会社のホスト型製品を終了させた決定は何を意味するのか。

第一の問いへの答えは単純な acquihire ではない。人材だけが必要なら個別採用で十分だった。Anthropic が買ったのは Alex Rattray とエンジニアチーム、そしてそのチームが 4 年間で OpenAI・Anthropic・Cloudflare のような会社の SDK を作りながら固めてきたパターンだ。このパターンが自社内に入るのと外部に縛られているのとでは大きな差がある。自社内に置けば、MCP やツール呼び出し仕様や権限モデルを自社標準として素早く統合できる。外部に置けば、その会社が OpenAI の SDK も同じパターンで作ることで標準が分散する。

第二の問いへの答えはもっと単純だ。ホスト型 SDK ジェネレーター自体はもう LLM のコード生成が侵食していく市場なので、事業としての寿命は長くない。Anthropic はその事業の未来より、その事業を作った人々とその人々のパターンを買いたかった。だから事業は EOL にし、人とパターンだけ持ってきた。既存顧客にとって不快な決定だが、市場の流れを見れば、どのみち 1〜2 四半期以内に同じ結末に至った決定でもある。

この取引が残すメッセージは一行で要約できる。**モデル会社の本当の競争軸は、モデルから、そのモデルを取り囲む SDK・ツール・MCP の厚みへ移った。** 5月の Anthropic-Stainless の取引はその移動の最初の可視的な信号だ。次の四半期に OpenAI と Google がどんなカードを切るかを見れば、この移動が一時的なのか永続的なのかがより鮮明になる。その間に SDK と MCP を作って自社 API を Claude に接続したい小さな会社は、5月 18日を予定表に書き込んでおいたほうがよい。インフラの風景はその日から変わる。

---
出典:
- [Anthropic acquires Stainless](https://www.anthropic.com/news/anthropic-acquires-stainless)
- [HN: Anthropic acquires Stainless](https://news.ycombinator.com/item?id=48182281)
