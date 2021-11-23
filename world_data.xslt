<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/">
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="description" content="First course exercise of the lecture Web and Multimedia Engineering." />
                <meta name="author" content="Timon Trettin" />
                <meta name="keywords" content="HTML, CSS, JS" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto&amp;display=swap" rel="stylesheet" />

                <link href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" rel="stylesheet" />

                <link href="index.css" rel="stylesheet" />

                <title>World Data Overview</title>
            </head>
            <body>
                <header>
                    <div id="header-row"></div>
                    <img id="logo" src="world_data-logo.svg" alt="logo" />
                    <nav><ul id="menu">
                        <li>
                            <a href="index.html">
                                <span class="fas fa-table"></span>
                                A1 - Table
                            </a>
                        </li>
                        <li>
                            <a href="parse.php">
                                <span class="fas fa-cogs"></span>
                                A2 - Parse
                            </a>
                        </li>
                        <li>
                            <a href="save.php">
                                <span class="fas fa-save"></span>
                                A2 - Save
                            </a>
                        </li>
                        <li>
                            <a href="print.php">
                                <span class="fas fa-print"></span>
                                A2 - Print
                            </a>
                        </li>
                        <li>
                            <a>
                                <span class="fab fa-node"></span>
                                A3 - REST
                            </a>
                        </li>
                        <li>
                            <a>
                                <span class="fas fa-map-marked-alt"></span>
                                A4 - Vis
                            </a>
                        </li>
                        <li>
                            <a>
                                <span class="fas fa-cube"></span>
                                A5 - 3D
                            </a>
                        </li>
                    </ul></nav>
                    <button id="menu-button" onclick="document.getElementById('menu').classList.toggle('flex')">
                        <span class="fas fa-bars"></span>
                    </button>
                </header>
                <div id="content">
                    <h1>World Data View...</h1>

                    <p id="text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        diam nonumy eirmod tempor invidunt ut labore et dolore ut labore et dolore magna aliquyam erat, sed diam
                        magna aliquyam erat, sed diam voluptua. At vero eos et voluptua. At vero eos et accusam et justo duo dolores et ea
                        accusam et justo duo dolores et ea rebum. Stet clita kasd rebum. Stet clita kasd gubergren, no sea takimata sanctus
                        gubergren, no sea takimata sanctus est Lorem ipsum dolor est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                        sit amet. Lorem ipsum dolor sit amet, consetetur
                        amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. from:
                        <a href="https://www.loremipsum.de/">www.loremipsum.de</a></p>

                    <div>Show/Hide: 
                        <a class="sh" onclick="[...document.getElementsByClassName('1')].forEach(e => e.classList.toggle('none'))">birth rate per 1000</a> |
                        <a class="sh" onclick="[...document.getElementsByClassName('2')].forEach(e => e.classList.toggle('none'))">cell phones per 100</a> |
                        <a class="sh" onclick="[...document.getElementsByClassName('3')].forEach(e => e.classList.toggle('none'))">children per woman</a> |
                        <a class="sh" onclick="[...document.getElementsByClassName('4')].forEach(e => e.classList.toggle('none'))">electricity consumption per capita</a> |
                        <a class="sh" onclick="[...document.getElementsByClassName('5')].forEach(e => e.classList.toggle('none'))">gdp_per_capita</a>
                    </div>

                    <div id="table-wrapper">
                        <table id="table" class="table table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>
                                        Country
                                        <span class="fas fa-sort-up" onclick="sortTable('asc')"></span>
                                        <span class="fas fa-sort-down" onclick="sortTable('dsc')"></span>
                                    </th>
                                    <th class="1">birth rate per 1000</th>
                                    <th class="2">cell phones per 100</th>
                                    <th class="3">children per woman</th>
                                    <th class="4">electricity consumption per capita</th>
                                    <th class="5">gdp_per_capita</th>
                                    <th>gdp_per_capita_growth</th>
                                    <th>inflation annual</th>
                                    <th>internet user per 100</th>
                                    <th>life expectancy</th>
                                    <th>military expenditure percent of gdp</th>
                                    <th>gps_lat</th>
                                    <th>gps_long</th>
                                </tr>
                            </thead>
                            <tbody>
                                <xsl:for-each select="Countries/Country">
                                    <tr>
                                        <td><xsl:value-of select="id"/></td>
                                        <td><xsl:value-of select="name"/></td>
                                        <td class="1"><xsl:value-of select="birth"/></td>
                                        <td class="2"><xsl:value-of select="cell"/></td>
                                        <td class="3"><xsl:value-of select="children"/></td>
                                        <td class="4"><xsl:value-of select="electricity"/></td>
                                        <td class="5"><xsl:value-of select="gdp_per_capita"/></td>
                                        <td><xsl:value-of select="gdp_per_capita_growth"/></td>
                                        <td><xsl:value-of select="inflation"/></td>
                                        <td><xsl:value-of select="internet"/></td>
                                        <td><xsl:value-of select="life"/></td>
                                        <td><xsl:value-of select="military"/></td>
                                        <td><xsl:value-of select="gps_lat"/></td>
                                        <td><xsl:value-of select="gps_long"/></td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </div>
                    <div>Show/Hide: 
                        <a class="sh" onclick="[...document.getElementsByClassName('1')].forEach(e => e.classList.toggle('none'))">birth rate per 1000</a> |
                        <a class="sh" onclick="[...document.getElementsByClassName('2')].forEach(e => e.classList.toggle('none'))">cell phones per 100</a> |
                        <a class="sh" onclick="[...document.getElementsByClassName('3')].forEach(e => e.classList.toggle('none'))">children per woman</a> |
                        <a class="sh" onclick="[...document.getElementsByClassName('4')].forEach(e => e.classList.toggle('none'))">electricity consumption per capita</a> |
                        <a class="sh" onclick="[...document.getElementsByClassName('5')].forEach(e => e.classList.toggle('none'))">gdp_per_capita</a>
                    </div>
                </div>

                <footer>
                    <div class="column">
                        <p>Copyright c 2020 world_data</p>
                        <p>First course exercise <b>HTML, CSS and JS</b> of the lecture Web and Multimedia Engineering.</p>
                    </div>
                    <div class="column-right">
                        <p>The solution has been created by:</p>
                        <p>Timon Trettin</p>
                    </div>
                </footer>

            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
