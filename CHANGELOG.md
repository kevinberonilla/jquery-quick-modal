# jQuery Quick Modal

#### v2.0.0 | August 22, 2017
* Updated all HTML classes and ids to use the `qm-` prefix
* Updated all events to use the `.qm` namespace
* Updated versioning to semantic style
* Removed CSS vendor prefixes (no longer needed)
* Demoted console logs for incorrect configuration to `warn` level (was `error` level)

---

#### v1.08 | October 5, 2015
* Fixed an issue where the close modal bindings still persisted when a specific combination of actions were taken

---

#### v1.07 | October 5, 2015
* Added the **onOpen** and **onClose** options
* Fixed an issue where the close modal bindings persisted after unbinding
* Code cleanup for maintainability

---

#### v1.06 | September 30, 2015
* Added the **appendBackgroundTo** option
* Fixed an issue where two modal backgrounds could be appended through a specific combination of bindings

---

#### v1.05 | September 16, 2015
* Code cleanup for maintainability

---

#### v1.04 | August 3, 2015
* Added the **enableBodyScroll** option

---

#### v1.03 | July 30, 2015
* Fixed an issue where the unbinding of the Esc key prevented modals to open on Firefox

---

#### v1.02 | July 22, 2015
* Added the **enableEsc** and **enableClickAway** options
* Added the **trigger** method
* Fixed an issue where modals taller than the viewport were not scrolling correctly

---

#### v1.01 | July 14, 2015
* Added method functionality
* Fixed an issue where the close modal selector was not binding correctly
* Added a min-height CSS property on the **.modal** class (fixes the appearance of empty modals)

---

#### v1.00 | July 9, 2015
* So it begins...