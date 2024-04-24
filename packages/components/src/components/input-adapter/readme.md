# LeanInputAdapter

Die **LeanInputAdapter**-Komponente wird im Zusammenhang mit der Nutzung von beliebigen Input-Komponenten innerhalb eines Formulars verwendet. Sie dient als technischer Container, der die jeweilige Input-Komponente als Control übergeben wird. Auf diese Weise wird die vollständige, datenseitige Steuerung der Input-Komponente über das **LeanInputAdapter** gewährleistet. Die Input-Komponente dient allein der optischen bzw. layouttechnischen Ausgabe.

## Konfiguration

Die **LeanInputAdapter**-Komponente wird über das Hauptelement `<lean-input-adapter'></lean-input-adapter>` erzeugt. Ihm wird mit dem Attribut `_control` die gewünschte Input-Komponente übergeben. Innerhalb der **LeanInputAdapter**-Komponente wird die eigentliche Input-Komponente geschrieben.

### Code

```tsx
<lean-input-adapter _control={this.ctrl.formLocation.getInput('location') as InputControl}>
	<kol-input-text _placeholder="Platzhaltertext" _type="text">
		Eingabefeld
	</kol-input-text>
</lean-input-adapter>
```

### Beispiel

<kol-input-text _placeholder="Platzhaltertext" _type="text">Eingabefeld</kol-input-text>

## Verwendung

### Verwaltete Properties

Die Adapter-Komponente verwaltet folgende Properties automatisch, **die dann nicht mehr direkt an der reinen KoliBri-Komponente gesetzt werden können**:

| Property     | Erläuterung                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `_checked`   | Handelt es sich bei der Eingabekomponente um eine Checkbox und ist der `_value` gleich `true`, dann wird `_checked` `true` gesetzt, ansonsten `false`. |
| `_disabled`  | Über das `Form`- und `InputControl` kann können alle bzw. ein Eingabefeld aktiviert und deaktiviert werden.                                            |
| `_error`     | Das `Form-` und `InputControl` werten automatisch die relevanten Validatoren aus und setzt die Fehlermeldung entsprechend.                             |
| `_name`      | Der Name des Eingabefeldes kann aus dem `InputControl`'s abgeleitet werden.                                                                            |
| `_on`        | Der Adapter hängt sich mit einem zusätzlichen Change-Listener in die Eingabekomponente ein, um Änderungen übernehmen zu können.                        |
| `_required`  | Über das `InputControl` kann ein Eingabefeld erforderlich oder nicht erforderlich gesetzt werden.                                                      |
| `_value`     | Der Wert eines Eingabefeldes entspricht dem sogenannten View-Value des `InputControl`'s.                                                               |
| `Label-Text` | Wenn ein Label im `InputControl` gesetzt ist, dann wird es beim Rendern im HTML übernommen.                                                            |

<!--### Best practices

### Anwendungsfälle

## Links und Referenzen

<!-- Auto Generated Below -->

## Properties

| Property                | Attribute   | Description                                                                                       | Type                                                                                                        | Default     |
| ----------------------- | ----------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------- |
| `_control` _(required)_ | --          | Gibt das Input-Control des Eingabefeldes an.                                                      | `InputControl`                                                                                              | `undefined` |
| `_debounce`             | `_debounce` | Gibt an wie viele Millisekunden das Rerendering beim Änderungen des Wertes verzögert werden soll. | `number \| undefined`                                                                                       | `250`       |
| `_on`                   | --          | Gibt die EventCallback-Funktionen für das Input-Event an.                                         | `InputTypeOnBlur & InputTypeOnClick & InputTypeOnChange & InputTypeOnFocus & InputTypeOnInput \| undefined` | `{}`        |

---
