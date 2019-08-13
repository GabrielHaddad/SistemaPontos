"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PointsService = class PointsService {
    constructor(pointModel) {
        this.pointModel = pointModel;
    }
    async insertPoint(timeArrive, timeDeparture, cpf) {
        const newPoint = new this.pointModel({
            timeArrive,
            timeDeparture,
            cpf,
        });
        const result = await newPoint.save();
        return result.cpf;
    }
    async getPoint() {
        const points = await this.pointModel.find().exec();
        return points.map((point) => ({
            timeArrive: point.timeArrive,
            timeDeparture: point.timeDeparture,
            cpf: point.cpf,
        }));
    }
    async getSinglePoint(cpf) {
        const point = await this.findPoint(cpf);
        return {
            timeArrive: point.timeArrive,
            timeDeparture: point.timeDeparture,
            cpf: point.cpf,
        };
    }
    async updatePoint(timeArrive, timeDeparture, cpf) {
        const updatedPoint = await this.findPoint(cpf);
        if (timeArrive) {
            updatedPoint.timeArrive = timeArrive;
        }
        if (timeDeparture) {
            updatedPoint.timeDeparture = timeDeparture;
        }
        if (cpf) {
            updatedPoint.cpf = cpf;
        }
        updatedPoint.save();
    }
    async deletePoint(cpf) {
        const result = await this.pointModel.deleteOne({ cpf }).exec();
        if (result.n === 0) {
            throw new common_1.NotFoundException("Could not find user");
        }
    }
    async findPoint(cpf) {
        let point;
        try {
            point = await this.pointModel.findOne({ cpf }).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException("Could not find user");
        }
        if (!point) {
            throw new common_1.NotFoundException("Could not find user");
        }
        return point;
    }
};
PointsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Point')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PointsService);
exports.PointsService = PointsService;
//# sourceMappingURL=points.service.js.map