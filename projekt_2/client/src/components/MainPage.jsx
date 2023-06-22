const MainPage = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-8xl font-bold text-purple-700 mb-16">QuizyEasy</h1>
            <p className="text-5xl text-purple-500 mb-12">Twój sposób na łatwe quizy!</p>

            <p className="text-xl text-gray-700 max-w-5xl mb-8 text-center">
                Nasz system QuizyEasy oferuje prosty i intuicyjny sposób na tworzenie quizów. Dzięki naszej aplikacji
                możesz dodawać pytania oraz grupować je w kategoriach, co pozwala na łatwą organizację. Dodatkowo,
                oferujemy również możliwość uczestnictwa w quizach. Użytkownik może wziąć udział w quizie, gdzie będzie
                musiał udzielić odpowiedzi na pytania i otrzyma ocenę swojej wiedzy na podstawie poprawności udzielonych
                odpowiedzi.
            </p>

            <p className="text-xl font-bold text-purple-500 max-w-5xl text-center">
                Dzięki QuizyEasy możesz cieszyć się prostotą i efektywnością nauki poprzez quizy. Zdobądź wiedzę w
                przyjemny i interaktywny sposób!
            </p>
        </div>
    );
};

export default MainPage;