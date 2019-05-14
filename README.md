# redux-dry-ts-actions

A micro library to help create action constructors and action types for redux. Written in, and designed for TypeScript.

*Don't repeat yourself*:
 1. You define each action constructor together with its action type string.
 2. TypeScript will then infer the action type union for you.

## Declaring action constructors and action type
```ts
const actions = {
    addTodo: createAction('addTodo', (text: string) => ({ text })),
    deleteTodo: createAction('deleteTodo', (id: string) => ({ id })),
    clearCompleted: createAction('clearCompleted'),
};

type Action = ActionTypeFromActionCreators<typeof actions>;

/* The Action type will be correctly inferred as:
type Action =
    { type: 'addTodo', payload: { text: string } } |
    { type: 'deleteTodo', payload: { id: string } } |
    { type: 'clearCompleted' };
*/
```

## Using action constructors

```ts
private onAddTodoClicked = () => {
    this.props.dispatch(actions.addTodo(this.state.text));
};

private onClearClicked = () => {
    this.props.dispatch(actions.clearCompleted());
};
```
