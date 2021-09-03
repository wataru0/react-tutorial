// https://zenn.dev/likr/articles/6be53ca64f29aa035f07
// ReactではJSXという構文でHTMLをマークアップする
// App()のようなJSXを返すような関数をコンポーネントと呼ぶ
// コンポーネントはただのJavaScriptの関数！！マークアップと同時にJS書ける！
import { useEffect, useState } from 'react';
import {fetchImages} from './api';

function Header() {
    return (
        <header className="hero is-dark is-bold">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Cute Dog Images</h1>
                </div>
            </div>
        </header>
    );
}

// JSXにJavaScriptの式を埋め込むには{式}とする
function Image(props) {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image">
                    <img
                        src={props.src}
                        alt="cute dog"
                    />
                </figure>
            </div>
        </div>
    );
}

function Loading() {
    return <p>Loading...</p>;
}

function Gallery(props) {
    // propsオブジェクトの分割代入！！urlsプロパティを配列として受け取る
    const {urls} = props; 
    // console.log(props);
    // console.log(urls);
    if (urls === null) {
        return <Loading />;
    }
    return (
        <div className="columns is-vcentered is-multiline">
            {/* mapメソッドで作られるJSX式は最も外側の要素にkey属性を付けないといけない */}
            {urls.map((url) => {
                return (
                    <div key={url} className="column is-3">
                        <Image src={url} />
                    </div>
                );
            })}
        </div>
    );
}

function Form(props) {
    function handleSubmit(event) {
        event.preventDefault();
        const {breed} = event.target.elements;
        props.onFormSubmit(breed.value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <div className="select is-fullwidth">
                            <select name="breed" defaultValue="shiba">
                                <option value="shiba">Shiba</option>
                                <option value='akita'>Akita</option>
                            </select>
                        </div>
                    </div>
                    <div className="control">
                        <button type="submit" className="button is-dark">
                            Reload
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function Main() {
    // const urls = null;
    // useState: 関数コンポーネントでstateを管理（保持と更新）するためのReactフック
    // useEffect: 関数の実行タイミングをレンダリング後まで遅らせるフック，第二引数で第一引数の実行タイミングを指定できる
    // urlsという名前のstate変数を宣言，初期値nullをセット.第二要素はstateの現在の値を更新するための関数
    const [urls, setUrls] = useState(null);
    useEffect(() => {
        fetchImages("shiba").then((urls) => {
            // urlsのstateをfetchが成功した値（async関数がPromiseを返した正規のurl）に更新
            setUrls(urls);
        });
    }, []);

    function reloadImages(breed) {
        fetchImages(breed).then((urls) => {
            setUrls(urls)
        });
    }
    return (
        <main>
            <section className="section">
                <div className="container">
                    <Form onFormSubmit={reloadImages}/>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <Gallery urls={urls}/>
                </div>
            </section>
        </main>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>Dog images are retrieved from Dog API</p>
                <p>
                    <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
                </p>
            </div>
        </footer>
    );
}

function App() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;

// コンポーネントは上のように分割することができる
// function App() {
//     return (
//         <div>
//             <header className="hero is-dark is-bold">
//                 <div className="hero-body">
//                     <div className="container">
//                         <h1 className="title">Cute Dog Images</h1>
//                     </div>
//                 </div>
//             </header>
//             <main>
//                 <section className="section">
//                     <div className="container">
//                         <div className="columns is-vcenterd is-multiline">
//                             <div className="column is-3">
//                                 <div className="card">
//                                     <div className="card-image">
//                                         <figure className="image">
//                                             <img
//                                                 src="https://images.dog.ceo/breeds/shiba/shiba-8.jpg"
//                                                 alt="cute dog"
//                                             />
//                                         </figure>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//             <footer className="footer">
//                 <div className="content has-text-centered">
//                     <p>Dog images are retrived from Dog API</p>
//                     <p>
//                         <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
//                     </p>
//                 </div>
//             </footer>
//         </div>
//     );
// }