---
title: 'Metaが「Llama路線」を捨てた — Muse Sparkはなぜmultimodal-native一体型設計に回帰したのか'
description: 'Llamaはテキストとして生まれ、後からイメージを学んだ。Muse Sparkは生まれた時からイメージとテキストとツール呼び出しを同じ言語で話す。この違いは何を意味するのか？ そしてなぜMetaは自らの最大の資産であったLlamaの重みを捨ててまで、この道に回帰したのか？'
pubDate: 2026-04-10T04:18:16.398Z
lang: ja
pairSlug: 'meta-muse-spark-multimodal-native'
draft: false
---
# Metaが「Llama路線」を捨てた — Muse Sparkはなぜmultimodal-native一体型設計に回帰したのか

> Llamaはテキストとして生まれ、後からイメージを学んだ。Muse Sparkは生まれた時からイメージとテキストとツール呼び出しを同じ言語で話す。この違いは何を意味するのか？ そしてなぜMetaは自らの最大の資産であったLlamaの重みを捨ててまで、この道に回帰したのか？

---

2026年4月8日、Meta Superintelligence Labsが**Muse Spark**を公開した。[TechCrunchはこの発表を"ground-up overhaul"と呼んだ](https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/)。Muse Sparkは既存のLlama重みを一行たりとも再利用していない。テキストLLMの上にvision encoderを載せるbolt-on方式を放棄し、最初からテキストとイメージとツール呼び出しを単一のトークンシーケンスとして学習する**native multimodal**アーキテクチャへと転換した。

発表翌日、[Meta AIアプリはApp Store総合ランキングで57位から5位に跳ね上がった](https://techcrunch.com/2026/04/09/meta-ai-app-climbs-to-no-5-on-the-app-store-after-muse-spark-launch/)。しかし本稿の関心は市場の反応ではない。**「multimodal-native一体型設計」の背後にある技術的実体とは何か、そしてなぜMetaはLlama重みを捨ててまでこの道を選ばなければならなかったのか？**

先に答えを述べる。Bolt-on方式のrepresentation gapがtool-useとvisual reasoningにおいてもはや無視できないボトルネックとなり、GPT-4o、Gemini、Muse Sparkに至るまでフロンティアモデル全体が同じ結論に収束しつつある。「Llamaオープンモデル陣営」の代表格であったMetaが路線を変えたということは、bolt-on時代が終わったということを意味する。

---

## 1. Muse Sparkが発表された週 — Metaは何を出したのか

**組織**: Meta Superintelligence Labs（MSL）は2025年後半にMeta内部に新設された。元Scale AI CEOのAlexandr Wangが率い、Llamaシリーズを作っていたGenAI組織とは分離されている。**組織の分離は、路線の分離を事前に予告していた。**

**中核機能**: [GIGAZINEの解説](https://gigazine.net/news/20260409-meta-muse-spark/)によれば、Muse Sparkの3つの中核能力は以下の通りである。

1. **Tool use** — 外部ツールの呼び出しをモデル内部の推論の一部として自然に組み込む。
2. **Visual chain-of-thought** — 画像を推論の中間ステップとして利用する。単に画像をテキストキャプションに変換するのではなく、画像そのものが思考プロセスのノードとなる。
3. **Contemplating mode** — 複数のエージェントが並列に推論し、その結果を統合する方式。

最も衝撃的な数字はベンチマークのスコアではなく効率性だ。GIGAZINEは「Llama 4 Maverickと同等の性能に到達するために必要な計算量を10分の1以下に削減した」と報じた。1/10のcomputeで同じ性能を達成するとは、単により効率的なモデルが出てきたという意味ではない。アーキテクチャそのものが異なるという意味である。

---

## 2. Llama路線とは何だったのか — 2023〜2025年の主流設計

「Llama路線」とは「まずテキストLLMを作り、その後マルチモーダルに拡張する」という設計哲学全体を指す。2023〜2025年においてオープンソース陣営の事実上の標準だった。

タイムラインを辿ると、LLaVAやFlamingo、そしてLlama 3 Vision、Llama 4 Maverickに至るまで、これらの共通構造は同一であった。

```
[画像] → [Vision Encoder (CLIP, ViT)] → [Projection Layer] → [LLM(Llama)]
```

画像をvision encoderが埋め込みベクトルに変換し、projection layerがLLMの埋め込み空間に「翻訳」する。すでに学習済みのLLM重みをそのまま再利用できる点で極めて効率的であり、学界の一研究室がLLaVAのようなモデルを作れたのはこのおかげである。

**ところが問題があった。** 徐々に無視できなくなる構造的な問題だ。

**Representation gap**。画像はLLMの側から見れば「外部で翻訳されて入ってきた異質なトークン」である。モデルはその異質なトークンが正確に何を意味するのかを深く理解していない。そのためbolt-onマルチモーダルモデルは単純な「画像に何が写っているか？」にはうまく答えるが、深い視覚的推論——「このダイアグラムの流れを追って段階ごとに説明せよ」のようなもの——では底が浅い。ユーザーが画像を投げ込み、ツールを呼ばせた時に「このモデルは画像を見たのではなく、画像についてのキャプションを見たのだな」という感覚がはっきりと生じる。それがrepresentation gapである。

**Tool useのぎこちなさ**。ツール呼び出しもテキストLLMが事後的に学習した「外部インターフェース」だ。モデルがツールを呼ぶたびに「テキスト→ツール呼び出し→テキスト」変換を経る。そのためlong-horizonエージェントタスクでbolt-onモデルはしばしば道を見失う。

2025年後半、MetaはGPT-4oのvisual reasoningやGeminiのlong-horizonエージェント能力に追いつけないことが徐々に明白になった。そしてその格差はモデルサイズを大きくすれば埋まる種類ではなかった。**構造的格差**であった。

---

## 3. Native multimodalは具体的に何が違うのか

核心は3つだ——**トークン空間（token vocabulary）**、**アテンション（attention）**、**学習目標（training objective）**。この3つが同時に変わって初めて「native multimodal」となる。

### 3.1 トークン空間の統合 — 「画像が第一級市民になった」

既存のテキストLLMのトークン辞書は約10万〜30万個のテキストトークンで構成される。画像はこの辞書に存在しない。Bolt-on方式では、画像の埋め込みをprojection layerがテキストトークンに「見せかけて」LLMに押し込む——辞書に登録されていない臨時の客人だ。モデルは画像を「読む」ことはできても「書く」ことはできない。

Native multimodalでは、トークンvocabulary自体がテキスト、画像パッチ、ツール呼び出しのすべてを含むように最初から設計される。画像はもはや「翻訳されて入ってくる客人」ではなく、辞書に正式登録された第一級市民となる。モデルは画像パッチを読めるだけでなく、画像パッチを**書くこともできる**——別途のdiffusionモデルを接続せずとも。ツール呼び出しも辞書に正式登録された別個のトークンクラスとなり、モデルが「この時点でsearchツールを呼ぶ」と判断することは、次の単語を決定することと本質的に同じ行為となる。

### 3.2 Cross-modal attention — 「アテンションがモダリティの境界を知らない」

Bolt-onモデルでは、画像の埋め込みがLLMに入った後も「画像領域」と「テキスト領域」が区別される。アテンションパターンを可視化すると、画像とテキストの境界でアテンション重みが弱まる現象がしばしば観察される。

Native multimodalでは最初から統合シーケンスとして学習されるため、この境界が消失する。これが**Visual chain-of-thought**を可能にする。「この画像を見ると→ここの部分を拡大すると→こういうパターンが見えて→したがって答えは...」というプロセスの中で、モデルが実際に新たな画像トークンを生成し、その新たに生成された画像が次のステップの入力として再び投入される。Bolt-on構造では画像が出力できないトークンであるため、これは不可能だ。

### 3.3 Cross-modal training objective — 「次のトークンが何になるか、あらかじめ決まっていない」

既存のテキストLLMの学習目標は「与えられた先行トークンを見て、次のテキストトークンを予測せよ」だ。Native multimodalの学習目標は根本的に異なる——**「次のトークンが何であれそれを予測せよ」**。次のトークンがテキストかもしれないし、画像パッチかもしれないし、ツール呼び出しかもしれない。

```python
# Bolt-on multimodal (LLaVA)
loss = cross_entropy(predicted_text_token_after_image, actual_text_token)

# Native multimodal (Muse Spark, GPT-4o, Gemini)
loss = cross_entropy(
    predicted_next_token,  # text or image_patch or tool_call
    actual_next_token
)
```

この差異は表面的には微妙だが、結果は巨大である。画像パッチとテキストトークンが同じ埋め込み空間で意味的に近接するようになり、モデルは「猫」というテキストトークンと「猫の画像のパッチ群」が同一概念の異なる表現であることを自然に学習する。これがrepresentation gapが閉じるメカニズムである。

Llama 4 Maverickと同じ性能を1/10のcomputeで達成するとは、bolt-on構造において「画像をテキストに翻訳→そのテキストで推論→再び出力を生成」という迂回路が消滅した結果だ。トークン空間の統合、cross-modal attention、cross-modal training objectiveの3つが連動する時、推論は直進する。

---

## 4. 「Ground-up overhaul」の真のコスト — なぜこれが「刷新」なのか

Bolt-onからnativeへ向かうということは「既存モデルを改善する」という意味ではない。**既存に作り上げたもののほぼすべてを捨てる**という意味だ。

**(1) Llama重み — 最大の資産の放棄**

Llama 1からLlama 4 Maverickまで、Metaは少なくとも数十万GPU-monthのcomputeを投資した。Native multimodalへ向かう瞬間、この重みは再利用不可能となる。トークンvocabularyが異なるからだ。MetaがMuse Sparkを開発する際にLlama重みを一行たりとも再利用しなかったということは、5年をかけて積み上げた資産を事実上廃棄したということだ。

**(2) 学習データパイプライン — ゼロからやり直し**

Native multimodalにはテキストと画像が整列された巨大データセットが必要だ。単なる「画像＋キャプション」ペアではなく、long-formテキストの中に画像が挿入される形態のデータ、ツール呼び出しを含むtrajectoryデータ、visual chain-of-thought形式のreasoningデータ——こうしたデータは市場にほぼ存在しない。MetaがScale AIに巨額を投資し、Alexandr WangがMSLを率いることになったのは、このデータパイプラインをゼロから構築できる人材を招いたということだ。

**(3) 組織構造のコスト**

MetaはこのためにMeta Superintelligence Labsを新設し、既存のGenAI（Llama担当）組織と分離した。「Llama路線とnative multimodal路線を同じ組織で同時に追求するのは不可能だ」という判断の帰結だ。Llama組織のプライド、予算配分、人材移動——これらすべてが揺さぶられたはずだ。Metaがここまでの内部コストを甘受してなおnative multimodalへ進んだということは、「Llama路線を維持すれば未来はない」という切迫した判断があったことを示唆している。

---

## 5. GPT-4o、Gemini、Muse Spark — フロンティアが収束する方向

Metaだけがこの転換を行ったわけではない。フロンティアモデル陣営全体が同じ方向に収束しつつある。

**OpenAI GPT-4o**は2024年5月に初めて明示的に「natively multimodal」と呼ばれたモデルとなった。応答レイテンシの劇的な短縮が最も可視的なシグナルだった——以前は「音声→テキスト→処理→テキスト→音声」という迂回路を経ていたが、GPT-4oはその迂回路を除去した。**Google Gemini**は当初から「natively multimodal」を標榜して出発し、long contextとマルチモーダルreasoningでGPT-4oと直接競合する位置に到達した。そして今、**Metaが合流した**。最後のメジャープレイヤーがnative multimodalへ転換したことで、フロンティアモデル陣営の収束は事実上完了した。

この収束が意味するのは三つだ。第一に、**bolt-on時代が終わった**。少なくともフロンティア級モデルにおいては。第二に、**オープンソース陣営に突きつけられた重い問い**だ。Native multimodalの学習コストはbolt-onの数倍に達する。Llamaがオープンモデルのデファクトになれた理由の一つはbolt-on構造の低コスト性にあった。この低コスト性が失われれば、オープンモデル陣営はフロンティアとの格差をどう縮めるのか。第三に、**フロンティアが収束するほど参入障壁が上昇する**というパラドックスだ。全員が同じ方向を知っているからといって、その方向へ進むことが容易になるわけではない。

---

## 6. 何が残るのか — まだ答えられていない問い

**(1) Training computeの限界**

「1/10 compute」という数字は、fine-tuning段階以降のinference効率性に近い比較である可能性が高い。ゼロからnative multimodalで学習するのに要する総computeはbolt-onモデルより多い可能性がある。「より少ないcompute」とはinference時点のコストであり、構築時点のコストではない。

**(2) オープンソース陣営の追撃可能性**

Llama路線が終わったなら、オープンモデル陣営はどこへ向かうのか。MistralやQwen、DeepSeekが独自にnative multimodalを構築して追撃するか、それともテキスト専用領域に留まりフロンティアとの格差が拡大し続けるか。どちらが起きるかはまだ分からない。

**(3) Llama重みの行方**

MetaがLlama重みを再利用しなかったが、Llama 4 Maverickは依然オープンソースとして存続している。その重みを基盤とした無数の派生モデルやサービスが稼働中だ。**MetaがLlamaを捨てたことと、世界がLlamaを捨てることは別の話だ。** Llamaは「凍結されたartifact」として今後数年間オープンモデル陣営の基盤として使われ続ける可能性が高い。

---

## 7. 問い — あなたが使っているモデルはどの路線の上にあるのか

あなたが今使っているモデルはどの路線の上にあるのか？

ChatGPT（GPT-4o以降）やGemini、あるいはClaudeを使っているなら、あなたはすでにnative multimodalのユーザーだ。そのスムーズさが偶然ではなく、トークンvocabularyとアテンションと学習目標の統合という構造的決定の帰結であることを、今あなたは知った。

あなたが会社でLlama 4 Maverickをfine-tuneして使っていたり、LLaVAのバリアントを社内にデプロイしていたりするなら、一つの重い問いが残る。**このモデルはどれだけ持つのか？** 単純なテキスト分類や要約であればbolt-onモデルで十分に持ち堪える。しかしvisual reasoningやlong-horizonエージェントタスクが必要になる瞬間、native multimodalへの転換を検討しなければならない——それはMetaが示した通り「より大きなモデルに切り替える」ではなく「スタック全体を再検討する」ことに近い。

そして最後に、Meta自身への問い。Muse Sparkは始まりに過ぎない。MetaがLlama重みという巨大な資産を廃棄してまで敢行したこの賭けは成功するのか。答えはまだ分からない。しかし一つだけ確かなことがある。

技術はディテールに宿る。そしてMuse Sparkのディテールは——Llamaが終わったと語っている。

---

## 参考文献

- [TechCrunch — Meta debuts the Muse Spark model in a ground-up overhaul of its AI](https://techcrunch.com/2026/04/08/meta-debuts-the-muse-spark-model-in-a-ground-up-overhaul-of-its-ai/)
- [TechCrunch — Meta AI app climbs to No. 5 on the App Store after Muse Spark launch](https://techcrunch.com/2026/04/09/meta-ai-app-climbs-to-no-5-on-the-app-store-after-muse-spark-launch/)
- [GIGAZINE — Metaがネイティブマルチモーダル推論モデルMuse Sparkを発表](https://gigazine.net/news/20260409-meta-muse-spark/)
- [Gizmodo Japan — MetaのAIに復権の兆し、Muse Spark](https://www.gizmodo.jp/2026/04/meta_muse_spark.html)
- [Forbes Japan — Meta株価急騰、AI競争の反撃カード](https://forbesjapan.com/articles/detail/95425?s=ns)
- [Meta AI公式 (X) — Muse Spark introduces tool use, visual chain-of-thought](https://twitter.com/AIatMeta/status/2041910285653737975)
- [Meta AI公式 (X) — Muse Sparkのスケーリング特性研究](https://twitter.com/AIatMeta/status/2041926291142930899)
