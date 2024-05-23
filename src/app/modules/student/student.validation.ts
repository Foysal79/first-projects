import Joi from 'joi';

const usernameSchema = Joi.object({
    firstName: Joi.string()
        .trim()
        .max(20)
        .required()
        .custom((value, helpers) => {
            const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
            if (firstNameStr !== value) {
                return helpers.error('any.invalid', { value });
            }
            return value;
        }, 'Capitalization validation')
        .messages({
            'any.required': 'First name is required',
            'string.max': 'First name cannot be more than 20 characters',
            'any.invalid': '{#label} must start with a capital letter',
        }),
    middleName: Joi.string()
        .trim()
        .required()
        .messages({
            'any.required': 'Middle name is required'
        }),
    lastName: Joi.string()
        .trim()
        .required()
        .pattern(/^[A-Za-z]+$/, 'alpha')
        .messages({
            'any.required': 'Last name is required',
            'string.pattern.name': '{#label} is not valid',
        })
});

const guardianSchema = Joi.object({
    fatherName: Joi.string().required().messages({
        'any.required': "Father's name is required"
    }),
    fatherOccupation: Joi.string().required().messages({
        'any.required': "Father's occupation is required"
    }),
    fatherContactNo: Joi.string().required().messages({
        'any.required': "Father's contact number is required"
    }),
    motherName: Joi.string().required().messages({
        'any.required': "Mother's name is required"
    }),
    motherOccupation: Joi.string().required().messages({
        'any.required': "Mother's occupation is required"
    }),
    motherContactNo: Joi.string().required().messages({
        'any.required': "Mother's contact number is required"
    })
});

const localGuardianSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': "Local guardian's name is required"
    }),
    occupation: Joi.string().required().messages({
        'any.required': "Local guardian's occupation is required"
    }),
    contactNo: Joi.string().required().messages({
        'any.required': "Local guardian's contact number is required"
    }),
    address: Joi.string().required().messages({
        'any.required': "Local guardian's address is required"
    })
});

const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
        'any.required': 'Student ID is required'
    }),
    name: usernameSchema.required().messages({
        'any.required': 'Student name is required'
    }),
    gender: Joi.string().valid('male', 'female', 'other').required().messages({
        'any.required': 'Gender is required',
        'any.only': 'Gender must be male, female, or other'
    }),
    dateBirth: Joi.string(),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': '{#label} is not a valid email'
    }),
    contactNo: Joi.string().required().messages({
        'any.required': 'Contact number is required'
    }),
    emergencyContactNo: Joi.string().required().messages({
        'any.required': 'Emergency contact number is required'
    }),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required().messages({
        'any.required': 'Blood group is required',
        'any.only': '{#label} must be one of [A+, A-, B+, B-, AB+, AB-, O+, O-]'
    }),
    presentAddress: Joi.string().required().messages({
        'any.required': 'Present address is required'
    }),
    permanentAddress: Joi.string().required().messages({
        'any.required': 'Permanent address is required'
    }),
    guardian: guardianSchema.required().messages({
        'any.required': 'Guardian information is required'
    }),
    localGuardian: localGuardianSchema.required().messages({
        'any.required': 'Local guardian information is required'
    }),
    profileImg: Joi.string(),
    isActive: Joi.string().valid('active', 'blocked').required().messages({
        'any.required': 'Account status is required',
        'any.only': '{#label} must be either active or blocked'
    })
});

export default  studentValidationSchema;
