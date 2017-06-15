var basePath = '';
if (typeof window.__karma__ !== 'undefined') {
  basePath = 'base/';
}


jasmine.getFixtures().fixturesPath      = basePath + 'tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = basePath + 'app/dist/css';


describe("Default tests suit", function () {

    it('work?', function () {

        expect(true).toBe(true);

    });

});


describe("Check that fixtures load...", function () {

    beforeEach(function () {

        loadFixtures('fixture.html');
        loadStyleFixtures('app.css');

    });

    it('Hero plugin slides down', function () {

        var elem = $('.el');

        expect(elem.length).toBe(1);

    });

});
