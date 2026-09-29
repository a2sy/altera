const INTERNAL_TAGS = new Set(["note", "gardenEntry"]);

module.exports = {
  setupEleventy(eleventyConfig) {
    // Notes grouped by tag, alphabetically. A note appears under each of
    // its tags; notes without tags land in the untagged group.
    eleventyConfig.addFilter(
      "gpTagGroups",
      function (notes, untaggedLabel) {
        const groups = new Map();

        const add = (tag, note) => {
          if (!groups.has(tag)) {
            groups.set(tag, []);
          }

          groups.get(tag).push({
            url: note.url,
            title: note.data.title || note.fileSlug,
            noteIcon: note.data.noteIcon || "",
          });
        };

        for (const note of notes || []) {
          if (note.data.hide || note.data.hideInFiletree) {
            continue;
          }

          const tags = (note.data.tags || []).filter(
            (tag) => !INTERNAL_TAGS.has(tag)
          );

          if (tags.length === 0) {
            if (untaggedLabel) {
              add(untaggedLabel, note);
            }

            continue;
          }

          for (const tag of tags) {
            add(tag, note);
          }
        }

        return [...groups.entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([tag, groupNotes]) => ({
            tag,
            notes: groupNotes.sort((a, b) => a.title.localeCompare(b.title)),
          }));
      }
    );
  },
};
