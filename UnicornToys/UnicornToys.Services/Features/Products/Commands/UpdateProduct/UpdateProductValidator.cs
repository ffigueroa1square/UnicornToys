using FluentValidation;

namespace UnicornToys.Application.Features.Products.Commands.UpdateProduct
{
    public class UpdateProductValidator : AbstractValidator<UpdateProductCommand>
    {
        public UpdateProductValidator()
        {
            RuleFor(model => model.Id)
                .NotNull().WithMessage(String.Format(AppResource.FieldNullValidation, "Id"))
                .NotEmpty().WithMessage(String.Format(AppResource.FieldEmptyValidation, "Id"))
                .GreaterThan(0).WithMessage(String.Format(AppResource.IntGreaterThanValidation, "Id", 0));
            RuleFor(model => model.UpdateProductDto.Id)
                .NotNull().WithMessage(String.Format(AppResource.FieldNullValidation, "Id"))
                .NotEmpty().WithMessage(String.Format(AppResource.FieldEmptyValidation, "Id"))
                .GreaterThan(0).WithMessage(String.Format(AppResource.IntGreaterThanValidation, "Id", 0));
            RuleFor(model => model.UpdateProductDto.Name)
                .NotNull().WithMessage(String.Format(AppResource.FieldNullValidation, "Name"))
                .NotEmpty().WithMessage(String.Format(AppResource.FieldEmptyValidation, "Name"))
                .MaximumLength(50).WithMessage(String.Format(AppResource.MaxLengthValidation, 50));
            RuleFor(model => model.UpdateProductDto.Description)
                .MaximumLength(50).WithMessage(String.Format(AppResource.MaxLengthValidation, 100));
            RuleFor(model => model.UpdateProductDto.AgeRestriction)
                .ExclusiveBetween(0, 100).WithMessage(String.Format(AppResource.AgeRestrictionValidation, "Age", 0, 1));
            RuleFor(model => model.UpdateProductDto.Company)
                .NotNull().WithMessage(String.Format(AppResource.FieldNullValidation, "Company"))
                .NotEmpty().WithMessage(String.Format(AppResource.FieldEmptyValidation, "Company"))
                .MaximumLength(50).WithMessage(String.Format(AppResource.MaxLengthValidation, 50));
            RuleFor(model => model.UpdateProductDto.Price)
                .NotNull().WithMessage(String.Format(AppResource.FieldNullValidation, "Price"))
                .NotEmpty().WithMessage(String.Format(AppResource.FieldEmptyValidation, "Price"))
                .ExclusiveBetween(0, 100).WithMessage(String.Format(AppResource.AgeRestrictionValidation, "Price", 1, 1000));
        }
    }
}
