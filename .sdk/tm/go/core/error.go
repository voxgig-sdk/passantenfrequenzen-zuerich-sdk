package core

type PassantenfrequenzenZuerichError struct {
	IsPassantenfrequenzenZuerichError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPassantenfrequenzenZuerichError(code string, msg string, ctx *Context) *PassantenfrequenzenZuerichError {
	return &PassantenfrequenzenZuerichError{
		IsPassantenfrequenzenZuerichError: true,
		Sdk:              "PassantenfrequenzenZuerich",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *PassantenfrequenzenZuerichError) Error() string {
	return e.Msg
}
