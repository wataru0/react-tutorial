// https://zenn.dev/likr/articles/6be53ca64f29aa035f07
// ReactではJSXという構文でHTMLをマークアップする
// App()のようなJSXを返すような関数をコンポーネントと呼ぶ
// コンポーネントはただのJavaScriptの関数！！マークアップと同時にJS書ける！
import { useEffect } from 'react';
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
    // const url = "https://images.dog.ceo/breeds/shiba/shiba-8.jpg"
    
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

function Main() {
    // const urls = [
    //     "https://images.dog.ceo/breeds/shiba/shiba-11.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-12.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-14.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-17.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-2.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-3i.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-4.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-5.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-6.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-7.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-8.jpg",
    //     "https://images.dog.ceo/breeds/shiba/shiba-9.jpg",
    //   ];
    const urls = null;
    
    return (
        <main>
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