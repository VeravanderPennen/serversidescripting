# Serverside scripting -- Huiswerk werkcollege 4

## Doel

In deze oefening maak je een upload-formulier voor bestanden en ga je gegevens ophalen en weergeven uit een database.

## Voor je begint
* Plaats uitgepakte wc4-oefening map op de server
* Voer ```$ npm install``` uit in de wc4-oefening map  om de afhankelijkheden te installeren. 

### Leeslijst

* http://nodejs.org/api/fs.html
* http://www.mysqltutorial.org
    -  [MySQL SELECT](http://www.mysqltutorial.org/mysql-select-statement-query-data.aspx)
    -  [MySQL INNER JOIN](http://www.mysqltutorial.org/mysql-inner-join.aspx)
    -  [MySQL LEFT JOIN](http://www.mysqltutorial.org/mysql-left-join.aspx)

## Opdracht 1

Vaak biedt een applicatie de mogelijkheid aan de gebruiker om bestanden te uploaden en deze in een lijst weer te geven. Bedenk voordat je de code gaat schrijven hoe de structuur van het uploaden en weergeven van bestanden in een lijst eruit zou kunnen zien. Gebruik een specifieke folder voor de uploadbestanden. Hoeveel routes heb je nodig voor deze functionaliteit?

1. Maak de routes en formulier(en) voor het uploaden
2. Voeg de afhandeling van het uploadformulier toe. Zorg ervoor dat de bestanden in de uploaddirectory op de server terechtkomen.
3. Maak een overzicht met alle bestanden uit de upload-directory en geef die weer in een lijst. Maak hiervoor  gebruik van het [bestandssysteem](http://nodejs.org/api/fs.html).

## Opdracht 2

1. Bekijk de presentatie en de voorbeelden uit het hoorcollege van deze week nog eerst eens goed. Welke code moet je in ieder geval aan een applicatie toevoegen om gegevens uit een MySQL-database te kunnen halen?
2. Op Pulpitum (VirtualBox) staat al een voorbeelddatabase klaar waar we mee gaan werken. Inspecteer de tabel 'users' in de 'student' database via PHPMyAdmin op http://192.168.56.101/. Gebruikersnaam is student, wachtwoord is serverSide. Hoeveel records kom je tegen? Uit welke velden is een  record in de 'users' tabel opgebouwd?
3. Voeg de noodzakelijke MySQL-code toe aan dit project om gegevens uit de MySQL-database te kunnen halen.
4. Toon een lijst met alle gebruikers uit de database op de route ``` [GET] /users ``` oftewel http://192.168.56.101:3000/users.
5. Voeg handmatig via PHPMyAdmin gebruikers toe aan de user-tabel zodat ze zichtbaar worden als je bovenstaande url reloadt in de browser. Vul alleen email, user en name in. Het veld id wordt namelijk automatisch gevuld.

