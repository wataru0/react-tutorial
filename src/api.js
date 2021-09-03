// exportは他のプログラムがimportできるようになるおまじない
// asyncはPromiseを返す，fetchもPromiseを返す
export async function fetchImages(breed) {
    // awaitはasync function内でPromiseが返されるまで処理を待機する演算子
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/12`);
    const data = await response.json();
    return data.message;
}