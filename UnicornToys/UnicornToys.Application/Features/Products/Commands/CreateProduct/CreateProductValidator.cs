using FluentValidation;

namespace UnicornToys.Application.Features.Products.Commands.CreateProduct
{
    public class CreateProductValidator : AbstractValidator<CreateProductCommand>
    {
        public CreateProductValidator()
        {
            RuleFor(model => model.CreateProductDto.Name)
                .NotNull().WithMessage(String.Format(AppResource.FieldNullValidation, "Name"))
                .NotEmpty().WithMessage(String.Format(AppResource.FieldEmptyValidation, "Name"))
                .MaximumLength(50).WithMessage(String.Format(AppResource.MaxLengthValidation, 50));
            RuleFor(model => model.CreateProductDto.Description)
                .MaximumLength(50).WithMessage(String.Format(AppResource.MaxLengthValidation, 100));
            RuleFor(model => model.CreateProductDto.AgeRestriction)
                .ExclusiveBetween(0, 100).WithMessage(String.Format(AppResource.AgeRestrictionValidation, "Age", 0, 1));
            RuleFor(model => model.CreateProductDto.Company)
                .NotNull().WithMessage(String.Format(AppResource.FieldNullValidation, "Company"))
                .NotEmpty().WithMessage(String.Format(AppResource.FieldEmptyValidation, "Company"))
                .MaximumLength(50).WithMessage(String.Format(AppResource.MaxLengthValidation, 50));
            RuleFor(model => model.CreateProductDto.Price)
                .NotNull().WithMessage(String.Format(AppResource.FieldNullValidation, "Price"))
                .NotEmpty().WithMessage(String.Format(AppResource.FieldEmptyValidation, "Price"))
                .ExclusiveBetween(0, 100).WithMessage(String.Format(AppResource.AgeRestrictionValidation, "Price", 1, 1000));
        }
    }
}