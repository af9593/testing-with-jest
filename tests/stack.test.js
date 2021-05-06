const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('pop on empty stack returns undefined', () => {
    expect(stack.pop()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});

test('pop on stack returns the last element and removes it', () => {
    stack.push('Post pop');
    stack.push('Popped Element');

    expect(stack.pop()).toBeDefined();
    expect(stack.pop()).toBe('Popped Element');
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe('Post pop');
});