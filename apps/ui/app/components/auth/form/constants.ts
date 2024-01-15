export type FormType = 'SIGN_UP'| 'SIGN_IN';

export const FormType: Record<FormType, FormType>  = {
    SIGN_UP: 'SIGN_UP',
    SIGN_IN: 'SIGN_IN',
}

export type BodyText = {
    heading: string,
    buttonLabel: string,
    footerText: string,
    linkText: string,
}
export const bodyTexts: Record<FormType, BodyText> = {
    SIGN_IN: {
        heading: 'Sign in',
        buttonLabel: 'Sign in',
        footerText: 'Don\'t have an account? ',
        linkText: 'Sign up!'
    },
    SIGN_UP: {
        heading: 'Sign up',
        buttonLabel: 'Sign up',
        footerText: 'Already have an account? ',
        linkText: 'Sign in!'
    }
}

export const ModalMessage = {
    conflict : 'There is already an account with this username. If that is you then login!',
    badRequest: 'You have provided wrong credentials!',
    other: 'Something went wrong! Try again later.',
    fields: 'All fields are required!'
}
