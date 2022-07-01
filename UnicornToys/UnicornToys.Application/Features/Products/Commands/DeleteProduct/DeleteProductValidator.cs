using FluentValidation;

namespace UnicornToys.Application.Features.Products.Commands.DeleteProduct
{
    public class DeleteProductValidator : AbstractValidator<DeleteProductCommand>
    {
        public DeleteProductValidator()
        {
            RuleFor(model => model.Id)
                .NotNull().WithMessage(String.Format(AppResource.FieldNullValidation, "Id"))
                .NotEmpty().WithMessage(String.Format(AppResource.FieldEmptyValidation, "Id"))
                .GreaterThan(0).WithMessage(String.Format(AppResource.IntGreaterThanValidation, "Id", 0));
        }
    }
}
