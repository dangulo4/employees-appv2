### React Assignment Module 7

1. In this assignment your job will be to add a confirmation modal to the delete button in the table. Up to this point, you've used the React Bootstrap Button component to add a red button to each row in the table. When the button is clicked, the employee for that row is deleted. However, there is no feedback / confirmation given to the user that this operation is about to take place. What if the user clicked this button by accident? A delete confirmation modal when the button is clicked that gives the user the option to proceed with the delete operation or cancel the delete operation is ideal here. You will use the React Bootstrap Modal component here to complete this assignment. When the button is clicked, here's what the modal should look like:

Clicking the 'Yes' button will proceed with deleting the employee and the Modal will hide. Clicking the 'Cancel' button will not delete the employee and the Modal will hide.

2. Similarly, extract the three classes (EmployeeRow, EmployeeTable, and EmployeeList) from employees.jsx. The new file created should be called EmployeeList.jsx. Since this file needs the other extracted classes, EmployeeAdd and EmployeeFilter, you also need import statements for them in addition to the classes that are moved into this file. Only the class EmployeeList is exported, so you need to add the keywords 'export default' only to that class declaration. The other two classes are for internal use only, so they are not exported.

### General Notes Regarding this Assignment

- All of your work will be completed within the EmployeeList.jsx file and specifically within the EmployeeRow component.
- The EmployeeRow component is currently a stateless (function) component. It will need to be converted to a class component so that you can work with state.
- You'll need to add a constructor function, super function within the constructor, and then set up a state object to store the visibility of the Modal.
- When we demoed the Modal last we used two functions to set the visibility of the Modal handleShowModal and handleHideModal. You will only use one function here called toggleModal. You can use this syntax here to toggle the visibility back and forth between true and false: !this.state.modalVisible.
- Don't forget to bind toggleModal to the constructor.
  The actual Modal can appear within the <td> tag...the same <td> tag that contains the Delete button.
- Remember, you Modal footer will now have two buttons. One that cancels out of the Modal and hides it and one that proceeds with the deletion and also hides the Modal.
