/**
 * Creates the Game Animation & Development Studio interest/readiness form.
 *
 * How to use:
 * 1. Go to https://script.google.com/
 * 2. Create a new Apps Script project.
 * 3. Paste this file into Code.gs.
 * 4. Run createGameAnimationDevelopmentStudioForm().
 * 5. Authorize the script when prompted.
 * 6. Check the execution log for the edit and public form URLs.
 */
function createGameAnimationDevelopmentStudioForm() {
  const form = FormApp.create('Game Animation & Development Studio: Interest and Readiness Form');

  form.setDescription(
    'The Game Animation & Development Studio is for students interested in creating playable games, game animation, interactive projects, characters, levels, stories, and digital game assets.\n\n' +
    'This is not mainly a film or cartoon animation club. The focus is on animation and design for games, interactive media, and game development.\n\n' +
    'Completing this form does not automatically guarantee a place. It helps determine student interest, experience level, laptop access, and the best starting group.\n\n' +
    'The studio will be managed through Google Classroom. Concept lessons, tutorials, starter files, weekly challenges, and help resources will be posted there. Wednesday lunchtime sessions will be short studio check-ins for work-in-progress review, feedback, live user experience, and next-step planning.'
  );

  form.setConfirmationMessage(
    'Thank you for completing the form. Selected students will be contacted with the next steps for joining the Game Animation & Development Studio.'
  );

  form.setCollectEmail(true);
  form.setAllowResponseEdits(true);
  form.setLimitOneResponsePerUser(false);
  form.setShowLinkToRespondAgain(false);

  addTextItem_(form, 'Full name', true);
  addTextItem_(form, 'Class', true);

  form.addParagraphTextItem()
    .setTitle('Why are you interested in joining the Game Animation & Development Studio?')
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Have you made anything before?')
    .setHelpText('Select all that apply.')
    .setChoiceValues([
      'A game',
      'An animation',
      'Digital art or game assets',
      'A character design',
      'A story/world idea',
      'Code or programming project',
      'I have not made anything yet, but I am interested'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('What tools or software have you used before?')
    .setHelpText('Examples: Godot, Scratch, Roblox Studio, Unity, Blender, Piskel, Krita, Canva, Python, JavaScript, Construct, GDevelop.')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('What would you most like to build first?')
    .setChoiceValues([
      'A simple playable game',
      'Game animation or character movement',
      'Characters, objects, or visual assets',
      'A story/world for a game',
      'A team project',
      'I am not sure yet'
    ])
    .setRequired(true);

  form.addPageBreakItem()
    .setTitle('Laptop Access And Readiness')
    .setHelpText(
      'For the first stage, we will focus mainly on 2D games in Godot. Students do not need a gaming laptop, but they do need reliable access to a machine that can run Godot and show project work. A reasonably modern laptop with about 8 GB RAM is recommended for using the Godot editor. If you do not have a laptop, you must arrange to partner with someone who can bring one before attending.'
    );

  form.addMultipleChoiceItem()
    .setTitle('Do you have access to a laptop suitable for 2D game development in Godot?')
    .setChoiceValues([
      'Yes, I have a laptop and can bring it on Wednesday lunchtimes',
      'Yes, I have a laptop, but I may not be able to bring it every week',
      'No, but I have already arranged to work with someone who can bring a laptop',
      'No, and I have not yet arranged a laptop/group'
    ])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Laptop readiness check')
    .setHelpText('Select all that apply.')
    .setChoiceValues([
      'My laptop can run Windows, macOS, or Linux',
      'My laptop has at least 8 GB RAM, or I believe it is powerful enough for Godot 2D work',
      'My laptop has enough free storage for Godot and project files',
      'I can bring my charger',
      'I am able to install or run Godot, if required',
      'I am not sure and would need help checking'
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('If you do not have a laptop, who will you work with?')
    .setHelpText('Write the name of the student or group you have arranged to work with. If you have not arranged this yet, write "Not arranged."')
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Laptop access agreement')
    .setChoiceValues([
      'I understand that these sessions will be production-focused. If I do not bring a laptop, I must be part of a group with access to one. The sessions will not be very engaging if I do not have access to a machine for building, testing, or demonstrating work.'
    ])
    .setRequired(true);

  form.addPageBreakItem()
    .setTitle('Studio Level And Working Style');

  form.addMultipleChoiceItem()
    .setTitle('Which starting level sounds closest to you?')
    .setChoiceValues([
      'Explorer: I am new and want to learn the basics',
      'Builder: I can make simple things and want to build a playable game',
      'Designer: I am interested in story, systems, choices, and game ideas',
      'Developer: I want to work in a team and help produce a complete project',
      'Director: I already have experience and want to prepare a polished showcase project'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Are you willing to show progress and receive respectful feedback from others?')
    .setChoiceValues([
      'Yes',
      'Not sure',
      'No'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Do you have a project, file, image, video, or link you would like to share?')
    .setHelpText('Paste a link or describe the work. Do not upload private files unless you have permission to share them.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Is there anything else I should know before selecting the first group?')
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Studio agreement')
    .setChoiceValues([
      'I understand that this is a production-focused studio. I am expected to arrive on time, respect others’ work, stay on task, and contribute to building or improving projects.'
    ])
    .setRequired(true);

  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Public form URL: ' + form.getPublishedUrl());

  return {
    editUrl: form.getEditUrl(),
    publishedUrl: form.getPublishedUrl()
  };
}

function addTextItem_(form, title, required) {
  form.addTextItem()
    .setTitle(title)
    .setRequired(required);
}

