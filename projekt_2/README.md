# Dokumentacja aplikacji QuizyEasy 

---

### 1. Identyfikacja zagadnienia biznesowego

Celem projektu jest stworzenie aplikacji, która umożliwi każdej osobie tworzenie pytań testowych oraz rozwiązywanie wygenerowanych quizów. Aplikacja zakłada możliwość dodawania pytań zarówno jednokrotnego, jak i wielokrotnego wyboru z nieograniczoną ilością możliwych odpowiedzi. Użytkownik powinien być w stanie w prosty i intuicyjny sposób stworzyć kategorię, wyświetlić listę istniejących kategorii, dodać nowe pytania, wyświetlić pytanie w danej kategorii wraz z poprawnymi odpowiedziami oraz wziąć udział w quizie. Zdefiniowany powyżej zakres projektu jest w pełni zrealizowany przez zaproponowaną aplikację. W przypadku rozszerzenia potrzeb biznesowych, aplikacja może być w łatwy sposób modyfikowana i rozszerzana. Przykładowym rozszerzeniem może być dodanie systemu autoryzacji, możliwości modyfikacji istniejących pytać, prywatnych kategorii i pytań, a także zbieranie statystyk z rozwiązanych testów.

### 2. Wymagania systemowe i funkcjonalne

Projekt oparty jest o architekturę MVC i składa się z dwóch części: serwerowej oraz klienckiej. Wykorzystano renderowanie po stronie klienta, a komunikacja między serwerem a klientem odbywa się z wykorzystaniem asynchroniczej komunikacji z użyciem REST API. Część serwerowa została napisana z użyciem środowiska uruchomieniowego Node.js, i frameworka Express. Jako bazę danych wykorzystano relacyjną bazę MySQL, a komunikacja z nią odbywa się przy użyciu Sequelize, który pełni rolę ORMa. Część kliencką napisano z wykorzystaniem biblioteki React, a do stylizacji widoków użyto biblioteki Tailwind.

Funkcjonalości aplikacji:

- wyświetlanie informacji o przeznaczeniu systemu
- tworzenie kategorii
  - tworzenie nowych kategorii dla quizów
  - kategoria powinna mieć unikalną nazwę
- wyświetlanie listy kategorii
- dodawanie pytań
    - tworzenie nowych pytań w ramach wybranej kategorii
    - tworzenie pytań jednokrotnego i wielokrotnego wyboru
    - dodawanie nielimitowanej liczby możliwych odpowiedzi
- wyświetlanie pytań w wybranej kategorii wraz z poprawnymi odpowiedziami
- rozwiązywanie quizów składających się z pytań z wybranej kategorii

### 3. Analiza zagadnienia i jego modelowanie

### 4. Implementacja

### 5. Podsumowanie