import * as React from 'react';
import { observer } from 'mobx-react';
import { ComponentType } from 'react';

export function bindInput<T>(component: ComponentType<T & {
  value?: string,
  onChangeText: (text: string) => void,
}>): ComponentType<T & {
  form: any,
  name: string,
}> {
  const Input : any = component;
  return observer(function BindingInput({
    form,
    name,
    ...props,
  }: any) {
    return (
      <Input
        value={form[name]}
        onChangeText={(text: string) => form[name] = text}
        { ...props }
      />
    );
  });
}

export function bindSubmit<T>(component: ComponentType<T & {
  disabled?: boolean,
}>) : ComponentType<T & {
  form: any,
}> {
  const Button: any = component;
  return observer(function BindingSubmit({
    form,
    ...props,
  }: any) {
    return (
      <Button {...props} disabled={!form.isValid} />
    )
  });
}
