# Sorunu Anlamak:
1. Bir sayı butonuna basıldığında ne olur?
* Kullanıcı bir sayı butonuna tıklar veya klavyeden bir sayı tuşuna basar. (`CalcButton` component in `App.js` veya `useEffect` hook'u)
* `onClick` prop'u veya `handleKeyDown` fonksiyonu, `handleApplyNumber()` fonksiyonunu çağırır. (`App.js`)
* `handleApplyNumber` fonksiyonu, `applyNumber()` action creator'ını çağırır ve sonucu `dispatch` eder. (`App.js`)
* `applyNumber()` action creator'ı, `{ type: APPLY_NUMBER, payload: <sayı> }` şeklinde bir action nesnesi döndürür. (`src/actions/index.js`)
* `dispatch` fonksiyonu, bu action nesnesini reducer'a gönderir. (`App.js`)
* Reducer, `APPLY_NUMBER` case'ini çalıştırır. (`src/reducers/index.js`)
* Eğer `overwriteDisplay` `true` ise (yani önceki işlem "=" veya "Enter" ile bitmişse), `total` sıfırlanır, `previousValue` sıfırlanır, `currentValue` yeni sayı olur, `overwriteDisplay` `false` olarak ayarlanır ve `history` temizlenir. Aksi takdirde, eğer `currentValue` "0" ise, `currentValue`'yi tıklanan sayıya ayarlar. Aksi takdirde, tıklanan sayıyı `currentValue`'nin sonuna ekler.
* React, state'in değiştiğini algılar ve `App` component'ini yeniden render eder.
* `TotalDisplay` component'i, güncellenmiş `state.currentValue` değerini gösterir. (`App.js`)

2. Eşittir (=) butonuna veya Enter tuşuna basıldığında ne olur?
* Kullanıcı "=" butonuna tıklar veya klavyeden "Enter" tuşuna basar. (`CalcButton` component in `App.js` veya `useEffect` hook'u)
* `onClick` prop'u veya `handleKeyDown` fonksiyonu, `handleCalculate()` fonksiyonunu çağırır. (`App.js`)
* `handleCalculate` fonksiyonu, `calculate()` action creator'ını çağırır ve sonucu `dispatch` eder. (`App.js`)
* `calculate()` action creator'ı, `{ type: CALCULATE }` şeklinde bir action nesnesi döndürür. (`src/actions/index.js`)
* `dispatch` fonksiyonu, bu action nesnesini reducer'a gönderir. (`App.js`)
* Reducer, `CALCULATE` case'ini çalıştırır. (`src/reducers/index.js`)
* Reducer, `calculateResult` fonksiyonunu `previousValue`, `currentValue` ve `operation` kullanarak çağırır. Sonucu `total` olarak ayarlar, `currentValue`'yi "0" olarak ayarlar, `previousValue`'yi "0" olarak ayarlar, `overwriteDisplay`'i `true` olarak ayarlar ve `previousOperation`'ı sıfırlar. Tamamlanan hesaplamayı `history`'ye ekler. Yeni state'i döndürür. (`src/reducers/index.js`)
* React, state'in değiştiğini algılar ve `App` component'ini yeniden render eder.
* `TotalDisplay` component'i, `currentValue` "0" olduğu için `state.total` değerini gösterir. (`App.js`)

3. C butonuna veya Escape tuşuna basıldığında ne olur?
* Kullanıcı "C" butonuna tıklar veya klavyeden "Escape" tuşuna basar. (`CalcButton` component in `App.js` veya `useEffect` hook'u)
* `onClick` prop'u veya `handleKeyDown` fonksiyonu, `handleClearEntry()` fonksiyonunu çağırır. (`App.js`)
* `handleClearEntry` fonksiyonu, `clearEntry()` action creator'ını çağırır ve sonucu `dispatch` eder. (`App.js`)
* `clearEntry()` action creator'ı, `{ type: CLEAR_ENTRY }` şeklinde bir action nesnesi döndürür. (`src/actions/index.js`)
* `dispatch` fonksiyonu, bu action nesnesini reducer'a gönderir. (`App.js`)
* Reducer, `CLEAR_ENTRY` case'ini çalıştırır. (`src/reducers/index.js`)
* Reducer, `currentValue`'yi "0" olarak ayarlar ve `overwriteDisplay`'i `false` olarak ayarlar. Yeni state'i döndürür. (`src/reducers/index.js`)
* React, state'in değiştiğini algılar ve `App` component'ini yeniden render eder.
* `TotalDisplay` component'i, `currentValue` "0" olduğu için `state.total` değerini gösterir. (`App.js`)

4. İşlem operatörlerine (+, -, *, /) basıldığında ne olur?
* Kullanıcı bir işlem operatörü butonuna tıklar veya klavyeden bir işlem tuşuna basar. (`CalcButton` component in `App.js` veya `useEffect` hook'u)
* `onClick` prop'u veya `handleKeyDown` fonksiyonu, `handleChangeOperation()` fonksiyonunu çağırır. (`App.js`)
* `handleChangeOperation` fonksiyonu, `changeOperation()` action creator'ını çağırır ve sonucu `dispatch` eder. (`App.js`)
* `changeOperation()` action creator'ı, `{ type: CHANGE_OPERATION, payload: <operatör> }` şeklinde bir action nesnesi döndürür. (`src/actions/index.js`)
* `dispatch` fonksiyonu, bu action nesnesini reducer'a gönderir. (`App.js`)
* Reducer, `CHANGE_OPERATION` case'ini çalıştırır. (`src/reducers/index.js`)
* Eğer `previousValue` sıfırdan farklıysa ve `currentValue` sıfırdan farklıysa, önceki işlem (`previousValue` ile `currentValue` kullanılarak `operation`) gerçekleştirilir ve sonuç `previousValue` olarak ayarlanır.
* Reducer, `operation`'ı yeni operatöre ayarlar, `previousValue`'yi `currentValue`'den alır (eğer henüz bir işlem yapılmadıysa), `currentValue`'yi "0" olarak ayarlar ve `overwriteDisplay`'i `false` olarak ayarlar ve `previousOperation`'ı günceller. Yeni state'i döndürür. (`src/reducers/index.js`)
* React, state'in değiştiğini algılar ve `App` component'ini yeniden render eder.
* `TotalDisplay` component'i, `state.previousValue` değerini gösterir. (`App.js`)
* `Operation` yazısının altında, `previousValue` ve `previousOperation` ile birlikte o anki işlem zinciri gösterilir. (`App.js`)

5. Klavye desteği nasıl çalışır?
* Kullanıcı klavyeden bir tuşa bastığında, `useEffect` hook'u içindeki `handleKeyDown` fonksiyonu tetiklenir. (`App.js`)
* Eğer basılan tuş bir sayı ise (0-9), `handleApplyNumber` fonksiyonu çağrılır ve `applyNumber` action'ı dispatch edilir.
* Eğer basılan tuş bir işlem operatörü ise (+, -, *, /), `handleChangeOperation` fonksiyonu çağrılır ve `changeOperation` action'ı dispatch edilir.
* Eğer basılan tuş "Enter" ise, `handleCalculate` fonksiyonu çağrılır ve `calculate` action'ı dispatch edilir.
* Eğer basılan tuş "Escape" ise, `handleClearEntry` fonksiyonu çağrılır ve `clearEntry` action'ı dispatch edilir.
* Her durumda, ilgili action dispatch edildikten sonra reducer state'i günceller ve UI yeniden render edilir.