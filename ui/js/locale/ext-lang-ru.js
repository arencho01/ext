/*
 * Russian translation
 * By ZooKeeper (utf-8 encoding)
 * 6 November 2007
 */

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">'+LS.__translate(LS.LoadinInProgress)+'</div>';

if(Ext.View){
  Ext.View.prototype.emptyText = "";
}

if(Ext.grid.GridPanel){
  Ext.grid.GridPanel.prototype.ddText = LS.__translate(LS.SSelectedLines);
}

if(Ext.TabPanelItem){
  Ext.TabPanelItem.prototype.closeText = LS.__translate(LS.CloseThisTab);
}

if(Ext.form.Field){
  Ext.form.Field.prototype.invalidText = LS.__translate(LS.TheValueInThisFieldIsInvalid);
}

if(Ext.LoadMask){
  Ext.LoadMask.prototype.msg = LS.__translate(LS.LoadingDots);
}

Date.monthNames = [
  LS.__translate(LS.January),
  LS.__translate(LS.February),
  LS.__translate(LS.March),
  LS.__translate(LS.April),
  LS.__translate(LS.May),
  LS.__translate(LS.June),
  LS.__translate(LS.July),
  LS.__translate(LS.August),
  LS.__translate(LS.September),
  LS.__translate(LS.October),
  LS.__translate(LS.November),
  LS.__translate(LS.December)
];

Date.getShortMonthName = function(month) {
  return Date.monthNames[month].substring(0, 3);
};

Date.monthNumbers = {
  Jan : 0,
  Feb : 1,
  Mar : 2,
  Apr : 3,
  May : 4,
  Jun : 5,
  Jul : 6,
  Aug : 7,
  Sep : 8,
  Oct : 9,
  Nov : 10,
  Dec : 11
};

Date.getMonthNumber = function(name) {
  return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
};

Date.dayNames = [
  LS.__translate(LS.Sunday),
  LS.__translate(LS.Monday),
  LS.__translate(LS.Tuesday),
  LS.__translate(LS.Wednesday),
  LS.__translate(LS.Thursday),
  LS.__translate(LS.Friday),
  LS.__translate(LS.Saturday)
];

Date.getShortDayName = function(day) {
  return Date.dayNames[day].substring(0, 3);
};

if(Ext.MessageBox){
  Ext.MessageBox.buttonText = {
    ok     : LS.__translate(LS.Ok),
    cancel : LS.__translate(LS.Cancel),
    yes    : LS.__translate(LS.Yes),
    no     : LS.__translate(LS.No)
  };
}

if(Ext.util.Format){
  Ext.util.Format.date = function(v, format){
    if(!v) return "";
    if(!(v instanceof Date)) v = new Date(Date.parse(v));
    return v.dateFormat(format || "d.m.Y");
  };
}

if(Ext.DatePicker){
  Ext.apply(Ext.DatePicker.prototype, {
    todayText          : LS.__translate(LS.Today),
    minText            : LS.__translate(LS.ThisDateIsBeforeTheMinimumDate),
    maxText            : LS.__translate(LS.ThisDateIsAfterTheMaximumDate),
    disabledDaysText   : "",
    disabledDatesText  : "",
    monthNames         : Date.monthNames,
    dayNames           : Date.dayNames,
    nextText           : LS.__translate(LS.NextMonthControlRight),
    prevText           : LS.__translate(LS.PreviousMonthControlLeft),
    monthYearText      : LS.__translate(LS.SelectAMonthControlUpDownToSelectTheYear),
    todayTip           : LS.__translate(LS.SSpace),
    format             : "d.m.y",
    okText             : "&#160;OK&#160;",
    cancelText         : LS.__translate(LS.Cancel),
    startDay           : 1
  });
}

if(Ext.PagingToolbar){
  Ext.apply(Ext.PagingToolbar.prototype, {
    beforePageText : LS.__translate(LS.P),
    afterPageText  : LS.__translate(LS.OfS),
    firstText      : LS.__translate(LS.FirstPage),
    prevText       : LS.__translate(LS.PreviousPage),
    nextText       : LS.__translate(LS.NextPage),
    lastText       : LS.__translate(LS.LastPage),
    refreshText    : LS.__translate(LS.Refresh),
    displayMsg     : LS.__translate(LS.EntriesFromSToSAreShownTotalOfS),
    emptyMsg       : LS.__translate(LS.NoDataToShow)
  });
}

if(Ext.form.TextField){
  Ext.apply(Ext.form.TextField.prototype, {
    minLengthText : LS.__translate(LS.MinimumLengthOfTheFieldS),
    maxLengthText : LS.__translate(LS.MaximumLengthOfTheFieldS),
    blankText     : LS.__translate(LS.ThisFieldIsRequired),
    regexText     : "",
    emptyText     : null
  });
}

if(Ext.form.NumberField){
  Ext.apply(Ext.form.NumberField.prototype, {
    minText : LS.__translate(LS.TheValueOfThisFieldMayNotBeLessThanS),
    maxText : LS.__translate(LS.TheValueOfThisFieldMayNotBeMoreThanS),
    nanText : LS.__translate(LS.SIsNotANumber)
  });
}

if(Ext.form.DateField){
  Ext.apply(Ext.form.DateField.prototype, {
    disabledDaysText  : LS.__translate(LS.NotAvailable),
    disabledDatesText : LS.__translate(LS.NotAvailable),
    minText           : LS.__translate(LS.TheDateInThisFieldShouldBeAfterS),
    maxText           : LS.__translate(LS.TheDateInThisFieldShouldBeBeforeS),
    invalidText       : LS.__translate(LS.SIsAnInvalidDateTheDateShouldBeSpecifiedInTheFormatS),
    format            : "d.m.y",
    altFormats        : "d.m.y|d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
  });
}

if(Ext.form.ComboBox){
  Ext.apply(Ext.form.ComboBox.prototype, {
    loadingText       : LS.__translate(LS.LoadingDots),
    valueNotFoundText : undefined
  });
}

if(Ext.form.VTypes){
  Ext.apply(Ext.form.VTypes, {
    emailText     : LS.__translate(LS.ThisFieldShouldContainAnEmailAddressInTheFormatUserdomaincom),
    urlText       : LS.__translate(LS.ThisFieldMustContainAUrlInTheFormatHttpwwwdomaincom),
    alphaText     : LS.__translate(LS.ThisFieldMayOnlyContainLatinLettersAndUnderscore),
    alphanumText  : LS.__translate(LS.ThisFieldMayOnlyContainLatinLettersNumbersAndUnderscore)
  });
}

if(Ext.form.HtmlEditor){
  Ext.apply(Ext.form.HtmlEditor.prototype, {
    createLinkText : LS.__translate(LS.PleaseEnterTheAddress),
    buttonTips : {
      bold : {
        title: LS.__translate(LS.BoldCtrlb),
        text: LS.__translate(LS.ChangeTheSelectedTextToBold),
        cls: 'x-html-editor-tip'
      },
      italic : {
        title: LS.__translate(LS.ItalicsCtrli),
        text: LS.__translate(LS.UseItalicsForTheSelectedText),
        cls: 'x-html-editor-tip'
      },
      underline : {
        title: LS.__translate(LS.UnderlinedCtrlu),
        text: LS.__translate(LS.UnderliningTheSelectedText),
        cls: 'x-html-editor-tip'
      },
      increasefontsize : {
        title: LS.__translate(LS.IncreaseTheSize),
        text: LS.__translate(LS.IncreasingTheFontSize),
        cls: 'x-html-editor-tip'
      },
      decreasefontsize : {
        title: LS.__translate(LS.DecreaseTheSize),
        text: LS.__translate(LS.DecreasingTheFontSize),
        cls: 'x-html-editor-tip'
      },
      backcolor : {
        title: LS.__translate(LS.BucketTool),
        text: LS.__translate(LS.ChangeTheBackgroundColorForTheSelectedTextOrParagraph),
        cls: 'x-html-editor-tip'
      },
      forecolor : {
        title: LS.__translate(LS.TextColor),
        text: LS.__translate(LS.ChangeTheTextColor),
        cls: 'x-html-editor-tip'
      },
      justifyleft : {
        title: LS.__translate(LS.LeftalignTheText),
        text: LS.__translate(LS.TextLeftAlignment),
        cls: 'x-html-editor-tip'
      },
      justifycenter : {
        title: LS.__translate(LS.Center),
        text: LS.__translate(LS.CenterTheText),
        cls: 'x-html-editor-tip'
      },
      justifyright : {
        title: LS.__translate(LS.RightalignTheText),
        text: LS.__translate(LS.TextRightAlignment),
        cls: 'x-html-editor-tip'
      },
      insertunorderedlist : {
        title: LS.__translate(LS.Bullets),
        text: LS.__translate(LS.StartABulletedList),
        cls: 'x-html-editor-tip'
      },
      insertorderedlist : {
        title: LS.__translate(LS.Numbering),
        text: LS.__translate(LS.StartANumberedList),
        cls: 'x-html-editor-tip'
      },
      createlink : {
        title: LS.__translate(LS.PasteALink),
        text: LS.__translate(LS.CreateALinkFromTheSelectedText),
        cls: 'x-html-editor-tip'
      },
      sourceedit : {
        title: LS.__translate(LS.SourceCode),
        text: LS.__translate(LS.SwitchToTheSourceCode),
        cls: 'x-html-editor-tip'
      }
    }
  });
}

if(Ext.grid.GridView){
  Ext.apply(Ext.grid.GridView.prototype, {
    sortAscText  : LS.__translate(LS.SortDescending),
    sortDescText : LS.__translate(LS.SortAscending),
    lockText     : LS.__translate(LS.FreezeTheColumn),
    unlockText   : LS.__translate(LS.UnfreezeTheColumn),
    columnsText  : LS.__translate(LS.Columns)
  });
}

if(Ext.grid.GroupingView){
  Ext.apply(Ext.grid.GroupingView.prototype, {
    emptyGroupText : LS.__translate(LS.EmptyDugka),
    groupByText    : LS.__translate(LS.GroupByThisField),
    showGroupsText : LS.__translate(LS.ShowInGroups)
  });
}

if(Ext.grid.PropertyColumnModel){
  Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
    nameText   : LS.__translate(LS.Namez),
    valueText  : LS.__translate(LS.Value),
    dateFormat : "d.m.Y"
  });
}

if(Ext.SplitLayoutRegion){
  Ext.apply(Ext.SplitLayoutRegion.prototype, {
    splitTip            : LS.__translate(LS.DragToResize),
    collapsibleSplitTip : LS.__translate(LS.DragToResizeDoubleclickToHideThePanel)
  });
}

if(Ext.layout.BorderLayout && Ext.layout.BorderLayout.SplitRegion){
  Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
    splitTip            : LS.__translate(LS.DragToResize),
    collapsibleSplitTip : LS.__translate(LS.DragToResizeDoubleclickToHideThePanel)
  });
}
