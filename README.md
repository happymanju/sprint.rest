# スプリント REST
### This was created during my time as a [Code Chrysalis](https://codechrysalis.io) Student

RESTful API のエンドポイントを作成するために、Express を使いこなすときが来ました。
このスプリントでは、ポケモンのデータに簡単にアクセスして操作するための API を作成します。

## 達成目標

- `express` を使用して RESTful CRUD API をセットアップできる。
- 複数のファイルをより快適に操作できる。
- `express` のエンドポイントをテストするのに役立つ、新しいライブラリ（`chai-http`）を学ぶ。
- テストの作成を強制することにより、TDD が重要であるという認識を強める。

## はじめに

`package.json` を見て、このリポジトリがどのように構成されているか確認してみましょう。
さまざまなファイルを調べて、ファイル間のデータの流れと、作業すべき箇所を理解しましょう。
このリポジトリには、最小限のスケルトンが配置されていますが、`express` サーバーのセットアップ（およびルーティングの整理）はすべてあなた次第です。
`underscore` がすでにこのリポジトリに追加されているので、自由に使用してください。もちろん、必要に応じて別のライブラリを使用することもできます。

## 基本レベル

**重要**: `.json` ソースファイルを変更する必要はありません。オブジェクト/配列に直接変更を加えてください。これは、サーバーの再起動時に変更が失われることを意味しますが、今日のスプリントの焦点は `express` と RESTful デザインに慣れることです。

テストを作成し、次のエンドポイントを実装しましょう。

- `GET /api/pokemon`
  - ポケモンの完全なリストを返してください。
  - 最初の `n` 体のポケモンのみを返すクエリパラメータ `limit=n` を使用できるエンドポイント作成してください。
- `POST /api/pokemon`
  - ポケモンを追加してください。基本レベルの場合、データに問題がないかバリデーションを行う必要はありません。
- `GET /api/pokemon/:id`
  - 指定した ID のポケモンを返してください。例：`GET /api/pokemon/042` は Golbat のデータを返すようにしてください。
  - ゼロパッディングを行う必要はないはずなので、`GET /api/pokemon/42` でも同様に Golbat を返すようにしてください。
- `GET /api/pokemon/:name`
  - 指定した名前のポケモンを返してください。例：`GET /api/pokemon/Mew` は Mew のデータを返すようにしてください。
  - 名前は大文字と小文字を区別すべきではありません。
  - ヒント：`GET /api/pokemon/:id` と `GET /api/pokemon/:name` を同じエンドポイントとして実装してみたいと思いませんか？。
- `PATCH /api/pokemon/:idOrName`
  - 指定したポケモンに部分的な変更を加えられるようにください。
- `DELETE /api/pokemon/:idOrName`
  - 指定したポケモンを削除してください。
- `GET /api/pokemon/:idOrName/evolutions`
  - 指定したポケモンが持っている進化系を返してください。
    - 一部のポケモンには進化系がないため、この場合は空の配列を返す必要があることに注意してください。
    - 例：`GET /api/pokemon/staryu/evolutions` は `[ { "id": 121, "name": "Starmie" } ]` を返すようにしてください。
- `GET /api/pokemon/:idOrName/evolutions/previous`
  - 進化したポケモンの場合、進化前のポケモンを返してください。
  - 例：`GET /api/pokemon/17/evolutions/previous` は `[ { "id": 16, "name": "Pidgey" } ]` を返すようにしてください。
- `GET /api/types`
  - 利用可能なすべてのタイプのリストを返してください。
  - エンドポイントに `n` タイプのみを返すクエリパラメータ `limit=n` を使用できるようにしてください。
- `POST /api/types`
  - タイプを追加してください。
- `DELETE /api/types/:name`
  - 指定したタイプを削除してください。
- `GET /api/types/:type/pokemon`
  - 指定したタイプのすべてのポケモンを返してください。
    - ポケモンの全データではなく、ポケモンの `id` and `name` のみを返してください。
- `GET /api/attacks`
  - すべてのアタックの種類を返してください。
  - エンドポイントに `n` アタックのみを返すクエリパラメータ `limit=n` を使用できるようにしてください。
- `GET /api/attacks/fast`
  - ノーマルアタック（fast attacks）を返してください。
  - エンドポイントに `n` アタックのみを返すクエリパラメータ `limit=n` を使用できるようにしてください。
- `GET /api/attacks/special` -スペシャルアタック（special attacks）を返してください。 -エンドポイントに `n` アタックのみを返すクエリパラメータ `limit=n` を使用できるようにしてください。
- `GET /api/attacks/:name`
  - ノーマルアタックであろうとスペシャルアタックであろうと、指定した名前でヒットしたアタックを返してください。
- `GET /api/attacks/:name/pokemon`
  - 指定した名前のアタックを持つすべてのポケモン（`id` および `name`）を返してください。
- `POST /api/attacks/fast` または `POST /api/attacks/special`
  - アタックを追加してください。
- `PATCH /api/attacks/:name`
  - 指定したアタックを変更してください。
- `DELETE /api/attacks/:name`
  - 指定したアタックを削除してください。

## 中級レベル

- すべての操作について、データに対する適切なバリデーションを追加しましょう。
- ページネーションをそれぞれのエンドポイントに追加しましょう。 `GET /api/pokemon` `GET /api/types` `GET /api/attacks` `GET /api/attacks/fast` `GET /api/attacks/special`
  - クライアントがデータコレクションを正しくページングできるように、追加のクエリパラメーターが必要となります。

## 応用レベル

ポケモンのデータを適切にネストすることで、`/pokemon` で終わるすべてのエンドポイントを真の RESTful API にしましょう。
例：`GET /api/attacks/:attackName/pokemon/:idOrName/evolutions` は機能するはずです。また、明らかにアタックを持たないポケモン ID または名前が指定された場合、404 を返すはずなので、これには、パラメーターの適切なバリデーションが必要となります。

## ナイトメアモード

データベースを追加し、そこにポケモンのデータを入れて、それを使用してデータのやり取りや変更の保存ができるようにしましょう。
