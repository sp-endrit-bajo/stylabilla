module.exports = function(Handlebars) {
    Handlebars.registerHelper('eachSubsection', function (sections, sectionNumber, options) {
      var subsections = sections.filter(function (section) {
        return section.depth === 3 && section.referenceNumber.indexOf(sectionNumber + '.') === 0;
      });
      if (subsections.length === 0) {
        return options.inverse(this);
      }
      return subsections.reduce(function (acc, subsection) {
        return acc + options.fn(subsection);
      }, '');
    });

    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
    });
};
